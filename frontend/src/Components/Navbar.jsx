import NavButton from "./NavButton";

export default function Navbar({ username, view, setView, onLogout, isDark, onToggleTheme }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm 
    dark:border-zinc-700 dark:bg-zinc-900 dark:border-zinc-900 transition-colors">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200 
        dark:bg-zinc-800 dark:text-white dark:ring-zinc-900 shadow-sm transition-colors">
          {username}
        </span>
      </div>

      <nav className="flex items-center gap-2">
        <NavButton label={"Play"} value="play" currentView={view} setView={setView}></NavButton>
        <NavButton label={"Leaderboard"} value="leaderboard" currentView={view} setView={setView}></NavButton>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl px-3 py-2 text-sm font-semibold ring-1 transition shadow-sm bg-zinc-50 text-zinc-900 ring-zinc-200 hover:bg-zinc-200 \
           dark:bg-zinc-800 dark:ring-zinc-900 dark:text-white \
           dark:hover:bg-zinc-700"
        >
          Log Out
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