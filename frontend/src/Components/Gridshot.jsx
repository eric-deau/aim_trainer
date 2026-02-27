import { useEffect, useMemo, useRef, useState } from "react";
import { createGridshotEngine } from "../game.js";
import { DURATION_S, DURATION_MS, TARGET_COUNT, TARGET_RADIUS } from "../utility/statics.js";
import HUD from "./HUD.jsx";
import Canvas from "./Canvas.jsx";

export default function GridShot({ onRunComplete }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  const [countdown, setCountdown] = useState(null); // null = not counting down
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION_S);
  const [hits, setHits] = useState(0);
  const [shots, setShots] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  const accuracy = useMemo(
    () => (shots === 0 ? 0 : Math.round((hits / shots) * 100)),
    [hits, shots]
  );

  const hps = useMemo(() => {
    const elapsed = running ? (DURATION_S - timeLeft) : DURATION_S;
    if (elapsed <= 0) return "0.00";
    return (hits / elapsed).toFixed(2);
  }, [hits, running, timeLeft]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const game = createGridshotEngine({
      mode: "gridshot",
      durationMs: DURATION_MS,
      durationS: DURATION_S,
      targetCount: TARGET_COUNT,
      targetRadius: TARGET_RADIUS,
    });

    gameRef.current = game;

    return () => {
      if (game.state.raf) cancelAnimationFrame(game.state.raf);
    };
  }, []);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      const canvas = canvasRef.current;
      const game = gameRef.current;
      if (!canvas || !game) {
        setCountdown(null);
        return;
      }

      game.reset(canvas);
      game.start(performance.now());

      setRunning(true);
      setStatus("Running");
      setTimeLeft(game.config.durationS);
      setHits(0);
      setShots(0);
      setScore(0);

      game.state.raf = requestAnimationFrame(loop);

      setCountdown(null);
      return;
    }

    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function syncUI(now, remainingMs) {
    const game = gameRef.current;

    if (Math.floor(now / 100) !== Math.floor((now - 16) / 100)) {
      setTimeLeft(remainingMs / 1000);
      setHits(game.state.hits);
      setShots(game.state.shots);
      setScore(game.state.score);
    }
  }

  function loop(now) {
    const canvas = canvasRef.current;
    const game = gameRef.current;
    if (!canvas || !game) return;

    const { done, remainingMs } = game.step(now);

    game.draw(canvas, now);
    syncUI(now, remainingMs);

    if (done) {
      setRunning(false);
      setTimeLeft(0);
      setHits(game.state.hits);
      setShots(game.state.shots);
      setScore(game.state.score);

      setStatus("Run Complete");
      onRunComplete?.(game.getResult());
      return;
    }

    game.state.raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || countdown !== null) return;

    setStatus("Get Ready");
    setCountdown(3);
  }

  function stop() {
    const game = gameRef.current;

    setCountdown(null);

    if (game?.state?.raf) cancelAnimationFrame(game.state.raf);
    game?.stop?.(performance.now());

    setRunning(false);
    setStatus("Stopped");
  }

  function onPointerDown(e) {
    if (countdown !== null) return;

    const canvas = canvasRef.current;
    const game = gameRef.current;
    if (!canvas || !game) return;

    game.pointerDown(canvas, e, performance.now());
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 space-y-6">
      <HUD
        running={running}
        timeLeft={timeLeft}
        hits={hits}
        shots={shots}
        hps={hps}
        acc={accuracy}
        status={status}
        score={score}
        stop={stop}
        start={start}
      />

      <div className="relative">
        <Canvas canvasRef={canvasRef} onPointerDown={onPointerDown} running={running} />

        {countdown !== null && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
            <div className="text-7xl font-extrabold text-white drop-shadow animate-pulse">
              {countdown}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}