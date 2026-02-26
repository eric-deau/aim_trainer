export default function AuthCardConfirmPassword({ value, onChange }) {
  return (
    <div>
      <label className="text-base font-medium text-zinc-700 dark:text-white">
        Confirm Password
      </label>
      <input
        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white dark:bg-zinc-800 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-zinc-300 dark:text-white dark:placeholder-zinc-400"
        value={value}
        onChange={onChange}
        type="password"
        autoComplete="new-password"
        placeholder="re-enter password"
      />
    </div>
  );
}