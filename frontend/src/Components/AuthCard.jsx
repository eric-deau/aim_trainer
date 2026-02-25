import { useState } from "react";

export default function AuthCard({ onLogin, onSignup }) {
  const [mode, setMode] = useState("login"); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const u = username.trim();
      if (mode === "login") {
        const user = await onLogin(u, password);
        return user;
      } else {
        const user = await onSignup(u, password);
        return user;
      }
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">
          {mode === "login" ? "Log in" : "Create account"}
        </h2>

        <div className="rounded-xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={[
              "rounded-lg px-3 py-1.5 text-sm font-medium transition",
              mode === "login" ? "bg-white shadow-sm" : "text-zinc-600 hover:text-zinc-900",
            ].join(" ")}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signUp")}
            className={[
              "rounded-lg px-3 py-1.5 text-sm font-medium transition",
              mode === "signUp" ? "bg-white shadow-sm" : "text-zinc-600 hover:text-zinc-900",
            ].join(" ")}
          >
            Sign up
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-700">Username</label>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="e.g. edeau"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700">Password</label>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="min 8 characters"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        </button>

        <p className="text-xs text-zinc-500">
          Cookies are used to keep you logged in.
        </p>
      </form>
    </div>
  );
}