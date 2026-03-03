import { useEffect } from 'react';
import SubmissionSummary from './SubmissionSummary';

export default function GuestPlayModal({ open, run, onClose, onSignup, error = "", }) {
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
            <div className="fixed inset-0 z-50">
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => onClose()}
                  />
            
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                      <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Run complete</h2>
                                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-200">
                                    Create an account and log in to submit scores!
                                </p>
                            </div>
            
                            <button
                                type="button"
                                onClick={() => onClose()}
                                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-50"
                                aria-label="Close"
                                >
                                ✕
                            </button>
                              </div>
                        <SubmissionSummary run={run}></SubmissionSummary>
                        
                        <div className="mt-5 flex flex-col gap-2">
                            <button
                                onClick={onSignup}
                                className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                            >
                                Sign up
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full rounded-xl px-4 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                            >
                                Continue as guest
                            </button>
                        </div>
            
                        {error ? (
                            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                        </div>
                      ) : null}
            
                    </div>
                  </div>
                </div>
        </>
    )

}