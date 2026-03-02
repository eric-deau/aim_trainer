import ThemeModeButton from "./ThemeModeButton";
import NavButton from "./NavButton";

export default function HeaderGuest({ isDark, onToggleTheme, view, setView }) {
  return (
    <header className="flex flex-wrap justify-end gap-3">
      <NavButton label="Go Back" value="login" currentView={view} setView={setView} />
      <NavButton label="Instructions" value="howto" currentView={view} setView={setView} />
      <ThemeModeButton isDark={isDark} onToggleTheme={onToggleTheme}></ThemeModeButton>
    </header>
  );
}