import DiscardButton from "./DiscardButton";
import SubmissionSummary from "./SubmissionSummary";
import SubmitButton from "./SubmitButton";
import { useEffect } from 'react';

export default function SubmissionModal({
    open,
    run,
    onClose,
    onSubmit,
    submitting = false,
    error = "",
    success = false,
}) {
  if (!open) return null;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => !submitting && !success && onClose()}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
          <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Run complete</h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-200">
                        Submit this run to the leaderboard?
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => !submitting && !success && onClose()}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-50"
                    disabled={submitting || success}
                    aria-label="Close"
                    >
                    ✕
                </button>
                  </div>
                   <div className="mt-3">
                    {submitting ? (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-sm text-zinc-700 ring-1 ring-zinc-200">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
                        Submitting score…
                    </div>
                    ) : success ? (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
                        ✓ Submitted!
                    </div>
                    ) : null}
                </div>
            <SubmissionSummary run={run}></SubmissionSummary>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-5 flex gap-2">
            <DiscardButton onClose={onClose} submitting={submitting} success={success}></DiscardButton>
            <SubmitButton onSubmit={onSubmit} submitting={submitting} success={success}></SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
}