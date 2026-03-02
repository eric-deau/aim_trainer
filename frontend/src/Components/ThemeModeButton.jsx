export default function ThemeModeButton({ isDark, onToggleTheme }) {
    return (
        <>
            <button
            type="button"
            onClick={onToggleTheme}
            className={[
                "rounded-xl px-3 py-2 text-base font-semibold ring-1 transition",
                "bg-zinc-50 text-zinc-900 ring-zinc-200 hover:bg-zinc-200",
                "dark:bg-zinc-800 dark:text-white dark:ring-zinc-900 dark:hover:bg-zinc-700",
            ].join(" ")}
            >
                {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
        </>
    )
}