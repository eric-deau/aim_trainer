export default function Navbar({ username, view, setView, onLogout, isDark, onToggleTheme }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm 
    dark:border-zinc-700 dark:bg-zinc-900 transition-colors">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200 
        dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-700 transition-colors">
          @{username}
        </span>
      </div>

      <nav className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setView("play")}
          className={[
            "rounded-xl px-3 py-2 text-sm font-semibold ring-1 transition",
            view === "play"
              ? "bg-zinc-900 text-white ring-zinc-900"
              : "bg-white text-zinc-900 ring-zinc-200 hover:bg-zinc-50",
          ].join(" ")}
        >
          Play
        </button>

        <button
          type="button"
          onClick={() => setView("leaderboard")}
          className={[
            "rounded-xl px-3 py-2 text-sm font-semibold ring-1 transition",
            view === "leaderboard"
              ? "bg-zinc-900 text-white ring-zinc-900"
              : "bg-white text-zinc-900 ring-zinc-200 hover:bg-zinc-50",
          ].join(" ")}
        >
          Leaderboard
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-50"
        >
          Logout
        </button>

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
      </nav>
    </header>
  );
}