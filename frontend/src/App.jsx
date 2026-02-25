import { useEffect, useState } from "react";
import AuthCard from "./Components/AuthCard.jsx";
import GridShot from "./Components/Gridshot.jsx";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import HeaderGuest from "./Components/HeaderGuest.jsx";
import Navbar from "./Components/Navbar.jsx";
import RunCompleteModal from "./Components/SubmissionModal.jsx";
import Leaderboard from "./Components/Leaderboard.jsx";

import './App.css'
import strings from "./lang/en/en.json";

import { useAuth } from "./hooks/useAuth.js"
import { useRunSubmit } from "./hooks/useRunSubmit.js";

import { withMinimumLoading } from "./utility/utils.js";


export default function App() {
  const [view, setView] = useState("play");

  const [loading, setLoading] = useState(true);
  const [loadingLabel, setLoadingLabel] = useState(strings["checkingSession"]);

  async function runWithLoader(label, fn, minMs = 2000) {
    setAuthError?.("");
    setLoadingLabel(label);
    setLoading(true);
    try {
      return await withMinimumLoading(fn, minMs);
    } finally {
      setLoading(false);
    }
  }


  const {
    user,
    authError,
    setAuthError,
    doLogin,
    doSignup,
    doLogout,
    checkSession,
  } = useAuth();

  const {
    runModalOpen,
    pendingRun,
    submitting,
    submitError,
    openRunModal,
    discardRun,
    confirmSubmit,
  } = useRunSubmit();

   useEffect(() => {
    let alive = true;

    (async () => {
      try {
          await runWithLoader(strings["checkingSession"], async () => {
          await checkSession?.();
        });
      } catch (e) {
        if (!alive) return;
        setAuthError?.(e?.message || strings["noSession"]);
      }
    })();

    return () => {
      alive = false;
    };
   }, []);
  
    async function handleLogin(username, password) {
      await runWithLoader(strings["loggingIn"] ?? "Signing in…", async () => {
        await doLogin(username, password);
      });
    }

    async function handleSignup(username, password) {
      await runWithLoader(strings["creatingAccount"] ?? "Creating account…", async () => {
        await doSignup(username, password);
      });
    }

    async function handleLogout() {
      await runWithLoader(strings["loggingOut"] ?? "Logging out…", async () => {
        await doLogout();
      });
      setView("play");
    }

  return (
  <>
    {loading && <LoadingScreen label={loadingLabel} />}
      <div className="min-h-screen w-full bg-zinc-100 p-6 transition-opacity duration-700 opacity-100 animate-fadeIn">
        <RunCompleteModal
          open={runModalOpen}
          run={pendingRun}
          submitting={submitting}
          error={submitError}
          onClose={discardRun}
          onSubmit={confirmSubmit}
        />

        <div className="mx-auto max-w-5xl space-y-6">
          {user ? (
            <Navbar
              username={user.username}
              view={view}
              setView={setView}
              onLogout={handleLogout}
            />
          ) : (
            <HeaderGuest />
          )}

          {authError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {authError}
            </div>
          )}

          {user ? (
            view === "play" ? (
              <GridShot onRunComplete={openRunModal} />
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="text-sm text-zinc-600"><Leaderboard></Leaderboard></div>
              </div>
            )
          ) : (
            <div className="grid place-items-center pt-8">
              <AuthCard
                onLogin={handleLogin}
                onSignup={handleSignup}
              />
            </div>
          )}
        </div>
        </div>
      </>
  );
}