export default function HowToPlay() {
    return (
    <div className="rounded-2xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-900 p-4 shadow-sm">
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                How To Play
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Quick instructions to get you started.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Goal</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        Click as many targets as you can before the timer runs out.
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Scoring</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        Your score is based on hits, accuracy, and hitstreak (how long you can continuously hit targets without missing).
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Controls</h3>
                    <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                        <li>Click / tap targets to hit them</li>
                        <li>Start begins a 3-second countdown</li>
                        <li>Stop ends the run early</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">TLDR</h3>
                    <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                        <li>Click circle good and fast</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}