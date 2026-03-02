import ThemeModeButton from "./ThemeModeButton";
import NavButton from "./NavButton";

export default function HeaderGuest({ isDark, onToggleTheme, view, setView }) {
  return (
    <header className="flex flex-wrap justify-end gap-3">
      <NavButton label="Login/Sign Up" value="guest" currentView={view} setView={setView} />
      <NavButton label="Instructions" value="howto" currentView={view} setView={setView} />
      <NavButton label={"Play As Guest"} value="play" currentView={view} setView={setView}></NavButton>
      <ThemeModeButton isDark={isDark} onToggleTheme={onToggleTheme}></ThemeModeButton>
    </header>
  );
}