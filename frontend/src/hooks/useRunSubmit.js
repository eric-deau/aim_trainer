import { useCallback, useState } from "react";
import { submitRun } from "../runs.js";

export function useRunSubmit() {
  const [runModalOpen, setRunModalOpen] = useState(false);
  const [pendingRun, setPendingRun] = useState(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const openRunModal = useCallback((run) => {
    setPendingRun(run);
    setSubmitError("");
    setRunModalOpen(true);
  }, []);

  const discardRun = useCallback(() => {
    if (submitting) return;
    setRunModalOpen(false);
    setPendingRun(null);
  }, [submitting]);

  const confirmSubmit = useCallback(async () => {
    if (!pendingRun) return;
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      await submitRun(pendingRun);
      setSubmitSuccess(true);

      setTimeout(() => {
        setRunModalOpen(false);
        setPendingRun(null);
        setSubmitSuccess(false);
      }, 1500);
      // setRunModalOpen(false);
      // setPendingRun(null);
    } catch (e) {
      setSubmitError(e?.message || "Failed to submit run");
    } finally {
      setSubmitting(false);
    }
  }, [pendingRun]);

  return {
    runModalOpen,
    pendingRun,
    submitting,
    submitError,
    submitSuccess,
    openRunModal,
    discardRun,
    confirmSubmit,
  };
}