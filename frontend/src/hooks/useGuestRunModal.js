import { useCallback, useState } from 'react';

export function useGuestRunModal() {
    const [guestModalOpen, setGuestModalOpen] = useState(false);
    const [pendingRun, setPendingRun] = useState(null);

    const openGuestModal = useCallback((run) => {
        setPendingRun(run);
        setGuestModalOpen(true);
    }, []);

    const discardGuestRun = useCallback(() => {
        setGuestModalOpen(false);
        setPendingRun(null);
    }, []);

    return {
        guestModalOpen,
        pendingRun,
        openGuestModal,
        discardGuestRun,
    };
}