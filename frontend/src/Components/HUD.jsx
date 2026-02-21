import Stat from "./Stat";
import GameButton from "./GameButton";

export default function HUD({ running, timeLeft, hits, shots, score, acc, start, stop, hps, status }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
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
              <Stat label="score" value={score} />
              <Stat label="Hits/sec" value={hps} />
            </div>
          </div>

          <div className="text-sm">
            {status ? (
              <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200">
              {status}
              </span>
              ) : (
              <span className="text-zinc-400">Ready</span>
            )}
        </div>
      </div>
    </div>
  );
}