export default function Stat({ label, value }) {
    return (
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 shadow-sm">
            <span className="text-xs font-medium text-zinc-500">{label}</span>
            <span className="text-sm font-semibold tabular-nums text-zinc-900">
                {value}
            </span>
        </div>
    );
}