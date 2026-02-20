import { useEffect, useMemo, useRef, useState } from 'react';

const MODE = "gridshot";
const DURATION_MS = "60_000";
const DURATION_S = 60;
const TARGET_COUNT = 3;
const TARGET_RADIUS = 28;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function dist2(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}

function spawnTarget(w, h) {
    return {
        x: rand(TARGET_RADIUS, w - TARGET_RADIUS),
        y: rand(TARGET_RADIUS, h - TARGET_RADIUS),
        r: TARGET_RADIUS,
        hitFlashUntil: 0,
    };
}

function getCanvasPoint(canvas, clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
    };
}

export default function GridShot({ onRunComplete }) {
    const canvasRef = useRef(null);

    const [running, setRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(DURATION_S);
    const [hits, setHits] = useState(0);
    const [shots, setShots] = useState(0);
    const [status, setStatus] = useState("");

    const gameRef = useRef({
        startTs: 0,
        raf: 0,
        targets: [],
        hits: 0,
        shots: 0,
        running: false,
        endTs: 0
    });

    const accuracy = useMemo(() => (shots === 0 ? 0 : Math.round((hits / shots) * 100)), [hits, shots]);
    
    const hps = useMemo(() => {
        const elapsed = running ? (DURATION_S - timeLeft) : DURATION_S;
        if (elapsed <= 0) return 0;
        return (hits / elapsed).toFixed(2);
    }, [hits, running, timeLeft])

    function resetRun() {
        const c = canvasRef.current;
        const targets = Array.from({ length: TARGET_COUNT }, () => spawnTarget(c.width, c.height));

        gameRef.current.targets = targets;
        gameRef.current.hits = 0;
        gameRef.current.shots = 0;
        gameRef.current.running = false;
        gameRef.current.startTs = 0;
        gameRef.current.endTs = 0;

        setHits(0);
        setShots(0);
        setTimeLeft(DURATION_S);
        setStatus("");
    }

    function drawFrame(now) {
        const c = canvasRef.current;
        const ctx = c.getContext("2d");
        const g = gameRef.current;

        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(0, 0, c.width, c.height);

        for (const t of g.targets) {
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);

            const flashing = now < t.hitFlashUntil;
            ctx.fillStyle = flashing ? "#ffd166" : "#ff4d4d";
            ctx.fill();

            ctx.lineWidth = 3;
            ctx.strokeStyle = flashing ? "#c08400" : "#b30000";
            ctx.stroke();
        }

        ctx.fillStyle = "#008000";
        ctx.fillRect(c.width / 2 - 1, c.height / 2 - 1, 2, 2);
    }
    function loop(now) {
        const g = gameRef.current;

        if (!g.startTs) g.startTs = now;
        const elapsed = now - g.startTs;
        const remaining = Math.max(0, DURATION_MS - elapsed);

        console.log()
        console.log("remaining", remaining);

        if (elapsed % 100 < 16) {
            setTimeLeft(remaining / 1000);
            setHits(g.hits);
            setShots(g.shots);
        }
        
        drawFrame(now);

        if (remaining <= 0) {
            g.running = false;
            g.endTs = performance.now;
            setRunning(false);
            setTimeLeft(0);
            setHits(g.hits);
            setShots(g.shots);

            const result = {
                mode: MODE,
                score: g.hits,
                shots: g.shots,
                duration: DURATION_S,
            };

            setStatus("Run Complete");
            onRunComplete?.(result);

            return;
        }

        g.raf = requestAnimationFrame(loop);
    }
    
    function start() {
        resetRun();
        const g = gameRef.current;
        g.running = true;
        setRunning(true);
        setStatus("");
        g.raf = requestAnimationFrame(loop);
    } 

    function stop() {
        const g = gameRef.current;
        cancelAnimationFrame(g.raf);

        g.running = false;
        setRunning(false);
        setStatus("Stopped");
    }

    function onPointerDown(e) {
        const c = canvasRef.current;
        const g = gameRef.current;

        if (!g.running) return;

        const { x, y } = getCanvasPoint(c, e.clientX, e.clientY);

        g.shots += 1;

        // check hit
        for (let i = 0; i < g.targets.length; i++) {
            const t = g.targets[i];
            if (dist2(x, y, t.x, t.y) <= t.r * t.r) {
                g.hits += 1;
                t.hitFlashUntil = performance.now() + 70;
                g.targets[i] = spawnTarget(c.width, c.height);
                break;
            }
        }
    }

    useEffect(() => {
        resetRun();
        drawFrame(performance.now());

        return () => {
            cancelAnimationFrame(gameRef.current.raf);
        };
    }, []);
    
    return (
        <div style={{ display: "grid", gap: 12, maxWidth: 1000 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <button onClick={start} disabled={running}>Start (60s)</button>
                <button onClick={stop} disabled={!running}>Stop</button>

                <div>Time: <b>{timeLeft.toFixed(1)}</b>s</div>
                <div>Hits: <b>{hits}</b></div>
                <div>Shots: <b>{shots}</b></div>
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