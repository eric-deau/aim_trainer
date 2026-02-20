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

function getCanvasPoints(canvas, clientX, clientY) {
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
    }
}