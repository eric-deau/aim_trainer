import HowToPlayInfoCard from "./HowToPlayInfoCard";

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
                <HowToPlayInfoCard title="Goal">
                Click as many targets as you can before the timer runs out.
                </HowToPlayInfoCard>

                <HowToPlayInfoCard title="Scoring">
                Your score is based on hits, accuracy, and hitstreak (how long you can
                continuously hit targets without missing).
                </HowToPlayInfoCard>

                <HowToPlayInfoCard title="Controls">
                <ul className="list-disc pl-5 space-y-1">
                    <li>Click / tap targets to hit them</li>
                    <li>Start begins a 3-second countdown</li>
                    <li>Stop ends the run early</li>
                </ul>
                </HowToPlayInfoCard>

                <HowToPlayInfoCard title="TLDR">
                <ul className="list-disc pl-5 space-y-1">
                    <li>Click circle good and fast</li>
                </ul>
                </HowToPlayInfoCard>
            </div>
        </div>
    </div>
  );
}