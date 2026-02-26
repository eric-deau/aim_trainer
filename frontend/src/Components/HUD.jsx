import Stat from "./Stat";
import GameButton from "./GameButton";

export default function HUD({ running, timeLeft, hits, shots, score, acc, start, stop, hps, status }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-900 p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
            <GameButton onClick={start} disabled={running}>
              Start (60s)
            </GameButton>
            <GameButton onClick={stop} disabled={!running} variant="secondary">
              Stop
            </GameButton>

            <div className="ml-0 flex flex-wrap gap-2 sm:ml-3">
              <Stat label="Time" value={`${timeLeft.toFixed(1)}s`} />
              <Stat label="Hits" value={hits} />
              <Stat label="Shots" value={shots} />
              <Stat label="Acc" value={`${acc}%`} />
              <Stat label="Score" value={score} />
              <Stat label="Hits/Sec" value={hps} />
            </div>
          </div>

          <div className="text-base">
            {status ? (
              <span
                className={[
                  "inline-flex items-center rounded-xl px-3 py-2 font-medium shadow-sm ring-1 transition",
                  status === "Running" && "bg-green-100 text-green-700 ring-green-200 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-800",
                  status === "Stopped" && "bg-red-100 text-red-700 ring-red-200 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800",
                  status !== "Running" && status !== "Stopped" &&
                    "bg-white text-zinc-700 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {status}
              </span>
            ) : (
              <span className="text-green-500 text-base">Ready</span>
            )}
        </div>
      </div>
    </div>
  );
}