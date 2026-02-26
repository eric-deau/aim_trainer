export default function MyRunsTableHeader() {
  return (
    <thead className="bg-zinc-50 dark:bg-zinc-800">
      <tr className="text-left text-zinc-600 dark:text-zinc-300">
        <th className="px-4 py-3 font-medium">Mode</th>
        <th className="px-4 py-3 font-medium text-right">Score</th>
        <th className="px-4 py-3 font-medium text-right">Acc</th>
        <th className="px-4 py-3 font-medium text-right">When</th>
      </tr>
    </thead>
  );
}