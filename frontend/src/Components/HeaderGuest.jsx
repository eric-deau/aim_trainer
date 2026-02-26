import ThemeModeButton from "./ThemeModeButton";

export default function HeaderGuest({ isDark, onToggleTheme }) {
  return (
    <header className="flex flex-wrap justify-end">
      <ThemeModeButton isDark={isDark} onToggleTheme={onToggleTheme}></ThemeModeButton>
    </header>
  );
}