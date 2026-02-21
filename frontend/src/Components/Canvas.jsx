import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utility/statics"

export default function Canvas({ canvasRef, onPointerDown, running }) {
    return (
        <div>
            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onPointerDown={onPointerDown}
                className={[
                    "w-full rounded-xl border border-zinc-200 bg-zinc-50",
                    "select-none touch-none",
                    running ? "cursor-crosshair" : "cursor-default",
                ].join(" ")}
            />
        </div>
    )
}