export default function MyRunsRow({ run }) {
  const acc = run.shots ? Math.round((run.hits / run.shots) * 100) : 0;
  const when = run.created_at ? new Date(run.created_at).toLocaleString() : "";

  return (
    <tr className="border-t border-zinc-100 dark:border-zinc-800">
      <td className="px-4 py-3 text-zinc-900 dark:text-white">{run.mode}</td>
      <td className="px-4 py-3 text-right font-semibold text-zinc-900 dark:text-white">
        {(run.score ?? 0).toLocaleString()}
      </td>
      <td className="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">
        {acc}%
      </td>
      <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">
        {when}
      </td>
    </tr>
  );
}