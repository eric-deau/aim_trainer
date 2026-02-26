import { useState } from "react";
import AuthCardHeader from "./AuthCardHeader";
import AuthCardUsername from "./AuthCardUsername";
import AuthCardPassword from "./AuthCardPassword";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import AuthCardConfirmPassword from "./AuthCardConfirmPassword";

import { passwordRules } from "../utility/utils.js";

export default function AuthCard({ onLogin, onSignup }) {
  const [mode, setMode] = useState("login"); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const u = username.trim();

      if (mode === "signUp") {
        const { lengthOk, upperOk, specialOk } = passwordRules(password);
        if (!lengthOk || !upperOk || !specialOk) {
          setError("Password does not meet requirements.");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
      }

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
    <div className="w-full max-w-lg sm:max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-900">
      <AuthCardHeader mode={mode} setMode={setMode}></AuthCardHeader>
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <AuthCardUsername username={username} onChange={(e) => setUsername(e.target.value)}></AuthCardUsername>
        <AuthCardPassword password={password} onChange={(e) => setPassword(e.target.value)} mode={mode}></AuthCardPassword>
        {mode === "signUp" && (
          <>
            <AuthCardConfirmPassword
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordStrengthMeter password={password} />
          </>
        )}
        
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-zinc-900 dark:bg-zinc-800 px-4 py-2 text-base font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
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