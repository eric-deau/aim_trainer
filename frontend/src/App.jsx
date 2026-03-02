import { useEffect, useState } from "react";
import GridShot from "./Components/Gridshot.jsx";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import HeaderGuest from "./Components/HeaderGuest.jsx";
import Navbar from "./Components/Navbar.jsx";
import SubmissionModal from "./Components/SubmissionModal.jsx";
import Leaderboard from "./Components/Leaderboard.jsx";
import MyAccount from "./Components/MyAccount.jsx";
import HowToPlay from "./Components/HowToPlay.jsx";
import GuestPage from "./Components/GuestPage.jsx";
import './App.css'
import strings from "./lang/en/en.json";

import { useAuth } from "./hooks/useAuth.js"
import { useRunSubmit } from "./hooks/useRunSubmit.js";
import { useTheme } from "./hooks/useTheme.js";

import { withMinimumLoading } from "./utility/utils.js";


export default function App() {
  const [view, setView] = useState("guest");

  const [loading, setLoading] = useState(true);
  const [loadingLabel, setLoadingLabel] = useState(strings["checkingSession"]);

  const [showLoader, setShowLoader] = useState(true);

  const { isDark, toggleTheme } = useTheme();

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
    submitSuccess,
    openRunModal,
    discardRun,
    confirmSubmit,
  } = useRunSubmit();


  // loader fade out
  useEffect(() => {
    if (loading) {
      setShowLoader(true);
      return;
    }
    const t = setTimeout(() => setShowLoader(false), 500); 
    return () => clearTimeout(t);
  }, [loading]);


  // run loader
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

  useEffect(() => {
    user ? setView("play") : setView("guest")
  }, [user]);
  
  // lock users from scrolling during loading screen
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);
  
  async function handleLogin(username, password, remember) {
    await runWithLoader(strings["loggingIn"] ?? "Signing in…", async () => {
      await doLogin(username, password, remember);
    });
    setView("play");
  }

  async function handleSignup(username, password) {
    await runWithLoader(strings["creatingAccount"] ?? "Creating account…", async () => {
      await doSignup(username, password);
    });
    setView("play");
  }

  async function handleLogout() {
    await runWithLoader(strings["loggingOut"] ?? "Logging out…", async () => {
      await doLogout();
    });
    setView("guest");
  }

  return (
    <>
      {showLoader && (
        <LoadingScreen label={loadingLabel} visible={loading} />
      )}
      <div className="min-h-screen w-full bg-zinc-100 p-6 dark:bg-zinc-950 transition-colors">
        <SubmissionModal
          open={runModalOpen}
          run={pendingRun}
          submitting={submitting}
          error={submitError}
          success={submitSuccess}
          onClose={discardRun}
          onSubmit={confirmSubmit}
        />

        <div className="mx-auto max-w-6xl space-y-6">
          {user ? (
            <Navbar
              username={user.username}
              view={view}
              setView={setView}
              onLogout={handleLogout}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          ) : (
              <HeaderGuest isDark={isDark} onToggleTheme={toggleTheme} view={view} setView={setView} />
          )}

          {authError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
              {authError}
            </div>
          )}
          {user ? (
            view === "play" ? (
              <GridShot onRunComplete={openRunModal} />
            ) : view === "leaderboard" ? (
              <Leaderboard />
            ) : view === "account" ? (
              <MyAccount></MyAccount>
            ) : (
              <HowToPlay></HowToPlay>
            )
          ) : (
              view === "howto" ? (
                <HowToPlay></HowToPlay>
              ) : view === "play" ? (
                <GridShot></GridShot>
              ) : (
                <GuestPage handleLogin={ handleLogin } handleSignup={ handleSignup }></GuestPage>
              )              
            )}
        </div>
      </div>
    </>
  );
}