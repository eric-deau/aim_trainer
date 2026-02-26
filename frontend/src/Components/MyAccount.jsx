import { useState, useEffect } from 'react'

import MyRunsCard from './MyRunsCard';
import ChangePasswordCard from './ChangePasswordCard';

import { getMyRuns, passwordRules } from '../utility/utils.js';
import { changePassword } from '../auth.js';

export default function MyAccount() {
  const [runs, setRuns] = useState([]);
  const [loadingRuns, setLoadingRuns] = useState(true);
  const [runsError, setRunsError] = useState("");

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwOk, setPwOk] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setRunsError("");
      setLoadingRuns(true);
      try {
        const rows = await getMyRuns({ limit: 50, offset: 0 });
        setRuns(rows);
      } catch (e) {
        setRunsError(e?.message || "Failed to load runs");
      } finally {
        setLoadingRuns(false);
      }
    })();
  }, []);

  async function onChangePassword(e) {
    e.preventDefault();
    setPwError("");
    setPwOk("");

    const r = passwordRules(newPw);
    if (!r.lengthOk || !r.upperOk || !r.specialOk) {
      setPwError("Password must be 5+ chars, include 1 uppercase and 1 special character.");
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("Passwords do not match.");
      return;
    }

    setPwLoading(true);
    try {
      await changePassword(currentPw, newPw);
      setPwOk("Password updated.");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (e) {
      setPwError(e?.message || "Failed to change password");
    } finally {
      setPwLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MyRunsCard runs={runs} loading={loadingRuns} error={runsError} />

      <ChangePasswordCard
        currentPw={currentPw}
        setCurrentPw={setCurrentPw}
        newPw={newPw}
        setNewPw={setNewPw}
        confirmPw={confirmPw}
        setConfirmPw={setConfirmPw}
        pwError={pwError}
        pwOk={pwOk}
        pwLoading={pwLoading}
        onSubmit={onChangePassword}
      />
    </div>
  );
}