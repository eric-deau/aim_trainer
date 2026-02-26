export default function Stat({ label, value }) {
    return (
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-800 px-3 py-2 shadow-sm">
            <span className="text-base font-medium text-zinc-500 dark:text-white">{label}</span>
            <span className="text-md font-semibold tabular-nums text-zinc-900 dark:text-white">
                {value}
            </span>
        </div>
    );
}