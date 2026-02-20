import { DURATION_S, DURATION_MS, TARGET_COUNT, TARGET_RADIUS } from "./utility/statics";

export function createGridshotEngine({
        mode = "gridshot",
        durationMs = DURATION_MS,
        durationS = DURATION_S,
        targetCount = TARGET_COUNT,
        targetRadius = TARGET_RADIUS,
    } = {}) {
    const rand = (min, max) => Math.random() * (max - min) + min;

    const dist2 = (ax, ay, bx, by) => {
        const dx = ax - bx;
        const dy = ay - by;
        return dx * dx + dy * dy;
    };

    const spawnTarget = (w, h) => ({
        x: rand(targetRadius, w - targetRadius),
        y: rand(targetRadius, h - targetRadius),
        r: targetRadius,
        hitFlashUntil: 0,
    });

    const getCanvasPoint = (canvas, clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
        };
    };

    const state = {
        mode,
        running: false,
        startTs: 0,
        raf: 0,
        endTs: 0,

        hits: 0,
        shots: 0,
        targets: [],

        canvasW: 0,
        canvasH: 0,
    };

    function reset(canvas) {
        state.canvasW = canvas.width;
        state.canvasH = canvas.height;

        state.targets = Array.from({ length: targetCount }, () =>
        spawnTarget(canvas.width, canvas.height)
        );

        state.hits = 0;
        state.shots = 0;

        state.running = false;
        state.startTs = 0;
        state.endTs = 0;
    }

    function start(now) {
        state.running = true;
        state.startTs = now;
        state.endTs = 0;
    }

    function stop(now) {
        state.running = false;
        state.endTs = now;
    }

    function step(now) {
        if (!state.running) {
        return { done: true, remainingMs: 0, elapsedMs: 0 };
        }

        const elapsedMs = now - state.startTs;
        const remainingMs = Math.max(0, durationMs - elapsedMs);
        const done = remainingMs <= 0;

        if (done) {
        stop(now);
        }

        return { done, remainingMs, elapsedMs };
    }

    function pointerDown(canvas, e, now) {
        if (!state.running) return { hit: false };

        const { x, y } = getCanvasPoint(canvas, e.clientX, e.clientY);
        state.shots += 1;

        for (let i = 0; i < state.targets.length; i++) {
        const t = state.targets[i];
        if (dist2(x, y, t.x, t.y) <= t.r * t.r) {
            state.hits += 1;
            t.hitFlashUntil = now + 70;
            state.targets[i] = spawnTarget(canvas.width, canvas.height);
            return { hit: true };
        }
        }

        return { hit: false };
    }

    function getResult() {
        return {
        mode: state.mode,
        score: state.hits,
        shots: state.shots,
        duration: durationS,
        };
    }

    function draw(canvas, now) {
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const t of state.targets) {
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
        ctx.fillRect(canvas.width / 2 - 1, canvas.height / 2 - 1, 2, 2);
    }

    return {
        state,
        reset,
        start,
        stop,
        step,
        draw,
        pointerDown,
        getResult,
        config: { durationMs, durationS },
    };
}