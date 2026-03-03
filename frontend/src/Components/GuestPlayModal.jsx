import { useEffect } from 'react';
import SubmissionSummary from './SubmissionSummary';
import ModalTemplate from './ModalTemplate';

export default function GuestPlayModal({
    open,
    run,
    onClose,
    onSignup,
    error = "",
    submitting = false,
    success = false,
}) {
    useEffect(() => {
        if (!open) return;
            const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;
    
    return (
        <>
            <ModalTemplate
                  subText={"Create an account and log in to submit scores!"}
                  submitting={submitting}
                  success={success}
                  error={error}
                >
                <SubmissionSummary run={run}></SubmissionSummary>
                <div className="mt-5 flex flex-col gap-2">
                    <button
                        onClick={onSignup}
                        className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                    >
                        Sign Up
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full rounded-xl px-4 py-2.5 text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
                    >
                        Continue as guest
                    </button>
                </div>
            </ModalTemplate>
        </>
    )

}