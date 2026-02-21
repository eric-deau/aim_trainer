import { useEffect, useMemo, useRef, useState } from 'react';
import { createGridshotEngine } from '../game.js'
import { DURATION_S } from '../utility/statics.js';
import HUD from './HUD.jsx';
import Canvas from './Canvas.jsx';

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
        setStatus("Running");
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
        <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
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
            ></HUD> 

            <Canvas canvasRef={canvasRef} onPointerDown={onPointerDown} running={running}></Canvas>
        </div>
    );
}