export default function GameButton({ children, disabled, onClick, variant = "primary" }) {
      const base =
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition " +
        "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const styles =
        variant === "primary"
        ? "bg-green-900 text-white hover:bg-green-800 focus:ring-zinc-900"
        : "bg-red-500 text-white ring-1 ring-zinc-200 hover:bg-red-50 focus:ring-zinc-300";

    return (
        <button className={`${base} ${styles}`} onClick={onClick} disabled={disabled}>
        {children}
        </button>
    );
}