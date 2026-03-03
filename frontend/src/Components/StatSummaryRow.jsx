export default function StatSummaryRow({ label, value, valueClassName = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-600 dark:text-zinc-300">{label}</span>
      <span className={`text-zinc-900 dark:text-white ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}