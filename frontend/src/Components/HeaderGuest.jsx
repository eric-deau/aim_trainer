import ThemeModeButton from "./ThemeModeButton";

export default function HeaderGuest({ isDark, onToggleTheme }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="tems-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Welcome to Git Gud!
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-200">
          Sign up / log in to play.
        </p>
      </div>
      <ThemeModeButton isDark={isDark} onToggleTheme={onToggleTheme}></ThemeModeButton>
    </header>
  );
}