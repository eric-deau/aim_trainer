export default function RunCompleteModal({
  open,
  run,
  onClose,
  onSubmit,
  submitting = false,
  error = "",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => !submitting && onClose()}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-zinc-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Run complete</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Submit this run to the leaderboard?
              </p>
            </div>

            <button
              type="button"
              onClick={() => !submitting && onClose()}
              className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

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

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-50 disabled:opacity-50"
            >
              Discard
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting}
              className="flex-1 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}