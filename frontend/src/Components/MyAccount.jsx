import { useEffect, useState } from "react";
import { getMyRuns, passwordRules } from "../utility/utils.js"; 
import { changePassword } from "../auth.js"

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
      {/* My runs */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-900 dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">My runs</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Your most recent runs.</p>

        {runsError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {runsError}
          </div>
        )}

        {loadingRuns ? (
          <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">Loading…</div>
        ) : runs.length === 0 ? (
          <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">No runs yet.</div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-700">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800">
                <tr className="text-left text-zinc-600 dark:text-zinc-300">
                  <th className="px-4 py-3 font-medium">Mode</th>
                  <th className="px-4 py-3 font-medium text-right">Score</th>
                  <th className="px-4 py-3 font-medium text-right">Acc</th>
                  <th className="px-4 py-3 font-medium text-right">When</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => {
                  const acc = r.shots ? Math.round((r.hits / r.shots) * 100) : 0;
                  const when = new Date(r.created_at).toLocaleString();
                  return (
                    <tr key={r.id} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="px-4 py-3 text-zinc-900 dark:text-white">{r.mode}</td>
                      <td className="px-4 py-3 text-right font-semibold text-zinc-900 dark:text-white">
                        {r.score.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">
                        {acc}%
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">
                        {when}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Change password */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-900 dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Change password</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Verify your current password, then set a new one.
        </p>

        <form onSubmit={onChangePassword} className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Current password
            </label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              New password
            </label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              autoComplete="new-password"
            />
            <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Min 5 chars, 1 uppercase, 1 special character.
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              autoComplete="new-password"
            />
          </div>

          {pwError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {pwError}
            </div>
          )}
          {pwOk && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {pwOk}
            </div>
          )}

          <button
            type="submit"
            disabled={pwLoading}
            className="w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            {pwLoading ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}