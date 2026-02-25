export default function SubmissionSummary({ run }) {
    return (
        <>
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Mode</span>
              <span className="font-medium text-zinc-900">{run?.mode}</span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-zinc-600">Score</span>
              <span className="font-semibold text-zinc-900">{run?.score}</span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-zinc-600">Hits / Shots</span>
              <span className="font-medium text-zinc-900">
                {run?.hits} / {run?.shots}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-zinc-600">Duration</span>
              <span className="font-medium text-zinc-900">
                {Math.round((run?.duration_ms ?? 0) / 1000)}s
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-zinc-600">Accuracy</span>
              <span className="font-medium text-zinc-900">
                {run?.shots ? Math.round((run.hits / run.shots) * 100) : 0}%
              </span>
            </div>
          </div>
        </>
    )
}