import MyRunsTableHeader from "./MyRunsTableHeader";
import MyRunsRow from "./MyRunsRow";

export default function MyRunsCard({ runs, loading, error }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-900 dark:border-zinc-700">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">My runs</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Your most recent runs.</p>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">Loading…</div>
      ) : runs.length === 0 ? (
        <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">No runs yet.</div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-700">
          <table className="w-full text-sm">
            <MyRunsTableHeader />
            <tbody>
              {runs.map((r) => (
                <MyRunsRow key={r.run_id ?? r.id} run={r} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}