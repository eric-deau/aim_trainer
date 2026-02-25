export default function AuthCardPassword({ password, onChange, mode }) {
    return (
        <>
            <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-white">Password</label>
            <input
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white dark:bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 
                focus:ring-zinc-300 dark:placeholder-white"
                value={password}
                onChange={onChange}
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="min 8 characters"
            />
            </div>
        </>
    )
}