import { useEffect, useMemo, useRef, useState } from 'react';
import { createGridshotEngine } from '../game.js'
import { DURATION_S } from '../utility/statics.js';

export default function GridShot({ onRunComplete }) {
    const canvasRef = useRef(null);
    const gameRef = useRef(null);

    const [running, setRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(DURATION_S);
    const [hits, setHits] = useState(0);
    const [shots, setShots] = useState(0);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState("");

    const accuracy = useMemo(() => (shots === 0 ? 0 : Math.round((hits / shots) * 100)), [hits, shots]);
    
    const hps = useMemo(() => {
        const elapsed = running ? (DURATION_S - timeLeft) : DURATION_S;
        if (elapsed <= 0) return "0.00";
        return (hits / elapsed).toFixed(2);
    }, [hits, running, timeLeft])

    useEffect(() => {
        const canvas = canvasRef.current;
        const game = createGridshotEngine({
            mode: "gridshot",
            durationMs: 60000,
            durationS: 60,
            targetCount: 3,
            targetRadius: 28,
        });

        gameRef.current = game;
        game.reset(canvas);
        game.draw(canvas, performance.now());

        return () => {
            if (game.state.raf) cancelAnimationFrame(game.state.raf);
        };
    }, []);

    function syncUI(now, remainingMs) {
        const game = gameRef.current;
        
        if (Math.floor(now / 100) !== Math.floor((now - 16) / 100)) {
            setTimeLeft(remainingMs / 1000);
            setHits(game.state.hits);
            setShots(game.state.shots);
            setScore(game.state.score)
        }
  }
    
    function loop(now) {
        const canvas = canvasRef.current;
        const game = gameRef.current;

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
        const canvas = canvasRef.current;
        const game = gameRef.current;

        game.reset(canvas);
        game.start(performance.now());

        setRunning(true);
        setStatus("");
        setTimeLeft(game.config.durationS);
        setHits(0);
        setShots(0);
        setScore(0);

        game.state.raf = requestAnimationFrame(loop);
    }

    function stop() {
        const game = gameRef.current;
        cancelAnimationFrame(game.state.raf);
        game.stop(performance.now());

        setRunning(false);
        setStatus("Stopped");
    }

    function onPointerDown(e) {
        const canvas = canvasRef.current;
        const game = gameRef.current;
        game.pointerDown(canvas, e, performance.now());
    }
    
    return (
        <div style={{ display: "grid", gap: 12, maxWidth: 1000 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <button onClick={start} disabled={running}>Start (60s)</button>
                <button onClick={stop} disabled={!running}>Stop</button>

                <div>Time: <b>{timeLeft.toFixed(1)}</b>s</div>
                <div>Hits: <b>{hits}</b></div>
                <div>Shots: <b>{shots}</b></div>
                <div>Score: <b>{score}</b></div>
                <div>Acc: <b>{accuracy}</b>%</div>
                <div>Hits/sec: <b>{hps}</b></div>

                <span style={{ color: "#666" }}>{status}</span>
            </div>

            <canvas
                ref={canvasRef}
                width={900}
                height={550}
                onPointerDown={onPointerDown}
                style={{
                    border: "1px solid #bbb",
                    borderRadius: 12,
                    touchAction: "none",
                    cursor: running ? "crosshair" : "default",
                    userSelect: "none",
                }}
            />
        </div>
    );
}