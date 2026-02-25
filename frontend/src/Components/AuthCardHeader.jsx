export default function AuthCardHeader({ mode, setMode }) {
    return (
        <>
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {mode === "login" ? "Log In" : "Create Account"}
            </h2>

            <div className="rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
                type="button"
                onClick={() => setMode("login")}
                className={[
                "rounded-lg px-3 py-1.5 text-base font-medium transition",
                mode === "login" ? "bg-white shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400",
                ].join(" ")}
            >
                Login
            </button>
            <button
                type="button"
                onClick={() => setMode("signUp")}
                className={[
                "rounded-lg px-3 py-1.5 text-base font-medium transition dark:text-zinc-200 dark:hover:text-white",
                mode === "signUp" ? "bg-white shadow-sm dark:bg-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400",
                ].join(" ")}
            >
                Sign Up
            </button>
            </div>
        </div>
        </>
    )
    
}