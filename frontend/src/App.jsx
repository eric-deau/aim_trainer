import { useEffect, useState } from "react";
import AuthCard from "./Components/AuthCard.jsx";
import GridShot from "./Components/Gridshot.jsx";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import HeaderGuest from "./Components/HeaderGuest.jsx";
import Navbar from "./Components/Navbar.jsx";
import { validSession, logOut, login, signUp } from "./auth.js";
import './App.css'
import strings from "./lang/en/en.json";


export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [err, setErr] = useState("");
  const [view, setView] = useState("play");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Loading…");

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function withLoading(label, fn, minMs = 700) {
    setErr("");
    setLoadingLabel(label);
    setLoading(true);

    const start = performance.now();
    try {
      return await fn();
    } finally {
      const elapsed = performance.now() - start;
      if (elapsed < minMs) await sleep(minMs - elapsed);
      setLoading(false);
    }
  }

  useEffect(() => {
    withLoading("Loading...", async () => {
      try {
        const u = await validSession();
        setUser(u);
      } catch (err) {
        setErr(err?.message || strings["noSession"]);
      } finally {
        setChecking(false);
      }
    }, 2000);
  }, []);

  async function onLogout() {
    await withLoading("Logging out…", async () => {
      await logOut();
      setUser(null);
      setView("play");
    });
  }

  if (checking || loading) {
    return <LoadingScreen label={loadingLabel} />
  }

  return (
    <div className="min-h-screen w-full bg-zinc-100 p-6 transition-opacity duration-700 opacity-100 animate-fadeIn">
      <div className="mx-auto max-w-5xl space-y-6">
        {user ? (
          <Navbar
            username={user.username}
            view={view}
            setView={setView}
            onLogout={onLogout}
          />
        ) : (
          <HeaderGuest />
        )}

        {err && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {checking ? (
          <div className="text-sm text-zinc-600">Checking session…</div>
        ) : user ? (
          view === "play" ? (
            <GridShot onRunComplete={(r) => console.log("run complete", r)} />
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-zinc-600">Leaderboard goes here.</div>
            </div>
          )
        ) : (
          <div className="grid place-items-center pt-8">
            <AuthCard
              onLogin={(u, p) =>
                    withLoading("Signing in…", async () => {
                      const user = await login(u, p);
                      setUser(user);
                      setView("play");
                      return user;
                })
              }
              onSignup={(u, p) =>
                withLoading("Creating account…", async () => {
                  const user = await signUp(u, p);
                  setUser(user);
                  setView("play");
                  return user;
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}