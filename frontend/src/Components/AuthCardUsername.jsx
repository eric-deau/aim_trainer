export default function AuthCardUsername({ username, onChange }) {
    return (
        <>
            <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-white">Username</label>
            <input
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white dark:bg-zinc-800 px-3 py-2 text-sm outline-none focus:ring-2 
                focus:ring-zinc-300 dark:placeholder-white"
                value={username}
                onChange={onChange}
                autoComplete="username"
                placeholder="e.g. edeau"
          />
        </div>
        </>
    )
}