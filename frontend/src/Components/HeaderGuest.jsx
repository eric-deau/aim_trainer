export default function HeaderGuest({isDark, onToggleTheme}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Git Gud
        </h1>
        <p className="text-sm text-zinc-600">
          Sign up / log in to save runs.
        </p>
        <button
          type="button"
          onClick={onToggleTheme}
          className={[
            "rounded-xl px-3 py-2 text-sm font-semibold ring-1 transition",
            "bg-white text-zinc-900 ring-zinc-200 hover:bg-zinc-50",
            "dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:hover:bg-zinc-800",
          ].join(" ")}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}