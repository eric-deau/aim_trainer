import { useEffect, useState } from "react";
import AuthCard from "./Components/AuthCard.jsx";
import GridShot from "./Components/Gridshot.jsx";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import HeaderGuest from "./Components/HeaderGuest.jsx";
import Navbar from "./Components/Navbar.jsx";
import { validSession, logOut } from "./auth.js";
import './App.css'
import strings from "./lang/en/en.json";


export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [err, setErr] = useState("");
  const [view, setView] = useState("play"); 
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    async function boot() {
      try {
        const [u] = await Promise.all([
          validSession(),
          new Promise(r => setTimeout(r, 2000)) // ← loading duration
        ]);

        setUser(u);
      } catch (e) {
        console.error(e);
      } finally {
        setChecking(false);
        setBooting(false);
      }
    }

    boot();
  }, []);

  async function onLogout() {
    setErr("");
    try {
      await logOut();
      setUser(null);
      setView("play");
    } catch (e) {
      setErr(e?.message || strings["failedLogout"]);
    }
  }

  if (booting || checking) {
    return <LoadingScreen />;
  } 

  return (
    <div className="min-h-screen w-full bg-zinc-100 p-6 transition-opacity duration-700 opacity-100 animate-fadeIn">
      <div className="mx-auto max-w-6xl space-y-6">
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
                  <Leaderboard></Leaderboard>
            </div>
          )
        ) : (
          <div className="grid place-items-center pt-8">
            <AuthCard onAuthed={(u) => { setUser(u); setView("play"); }} />
          </div>
        )}
      </div>
    </div>
  );
}