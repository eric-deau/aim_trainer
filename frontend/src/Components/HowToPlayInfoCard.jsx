export default function HowToPlayInfoCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        {children}
      </div>
    </div>
  );
}