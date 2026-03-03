import DiscardButton from "./DiscardButton";
import ModalTemplate from "./ModalTemplate";
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
    <ModalTemplate
      subText={"Submit this run to the leaderboard?"}
      submitting={submitting}
      success={success}
      error={error}
    >
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
      <div className="mt-5 flex gap-2">
        <DiscardButton onClose={onClose} submitting={submitting} success={success}></DiscardButton>
        <SubmitButton onSubmit={onSubmit} submitting={submitting} success={success}></SubmitButton>
      </div>
    </ModalTemplate>
  );
}