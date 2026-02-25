export default function NavButton({
  label,
  value,
  currentView,
  setView,
}) {
  const isActive = currentView === value;

  return (
    <button
      type="button"
      onClick={() => setView(value)}
      className={[
        "rounded-xl px-3 py-2 text-sm font-semibold ring-1 transition shadow-sm",

        isActive &&
          "bg-zinc-900 text-white ring-zinc-900 dark:bg-white dark:text-black",

        !isActive &&
          "bg-zinc-50 text-zinc-900 ring-zinc-200 hover:bg-zinc-200 \
           dark:bg-zinc-800 dark:ring-zinc-900 dark:text-white \
           dark:hover:bg-zinc-700",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}