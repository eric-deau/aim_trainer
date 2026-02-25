import { useCallback, useState } from "react";
import { submitRun } from "../runs.js";

export function useRunSubmit() {
  const [runModalOpen, setRunModalOpen] = useState(false);
  const [pendingRun, setPendingRun] = useState(null);
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

    try {
      await submitRun(pendingRun);
      setRunModalOpen(false);
      setPendingRun(null);
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
    openRunModal,
    discardRun,
    confirmSubmit,
  };
}