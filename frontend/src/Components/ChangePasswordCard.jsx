export default function ChangePasswordCard({
  currentPw,
  setCurrentPw,
  newPw,
  setNewPw,
  confirmPw,
  setConfirmPw,
  pwError,
  pwOk,
  pwLoading,
  onSubmit,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-900 dark:border-zinc-700">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Change password</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Verify your current password, then set a new one.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
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
            Minimum 5 characters, 1 uppercase, 1 special character.
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
  );
}