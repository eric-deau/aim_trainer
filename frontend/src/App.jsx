import { useEffect, useState } from "react";
import AuthCard from "./Components/AuthCard.jsx";
import GridShot from "./Components/Gridshot.jsx";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import HeaderGuest from "./Components/HeaderGuest.jsx";
import Navbar from "./Components/Navbar.jsx";
import RunCompleteModal from "./Components/SubmissionModal.jsx";
import { validSession, logOut, login, signUp } from "./auth.js";
import './App.css'
import strings from "./lang/en/en.json";

import { useAuth } from "./hooks/useAuth.js"
import { useRunSubmit } from "./hooks/useRunSubmit.js";


export default function App() {
  const [view, setView] = useState("play");

  const {
    user,
    booting,
    authError,
    setAuthError,
    doLogin,
    doSignup,
    doLogout,
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

  if (booting) {
    return <LoadingScreen label="Checking session…" />;
  }

  return (
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
            onLogout={async () => {
              setAuthError("");
              await doLogout();
              setView("play");
            }}
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
              <div className="text-sm text-zinc-600">Leaderboard goes here.</div>
            </div>
          )
        ) : (
          <div className="grid place-items-center pt-8">
            <AuthCard
              onLogin={doLogin}
              onSignup={doSignup}
            />
          </div>
        )}
      </div>
    </div>
  );
}