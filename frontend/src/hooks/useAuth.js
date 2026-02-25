import { useCallback, useEffect, useState } from "react";
import { validSession, login, signUp, logOut } from "../auth.js";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const u = await validSession();
        if (alive) setUser(u);
      } catch (e) {
        if (alive) setAuthError(e?.message || "Failed to check session");
      } finally {
        if (alive) setBooting(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const doLogin = useCallback(async (username, password) => {
    setAuthError("");
    const u = await login(username, password);
    setUser(u);
    return u;
  }, []);

  const doSignup = useCallback(async (username, password) => {
    setAuthError("");
    const u = await signUp(username, password);
    setUser(u);
    return u;
  }, []);

  const doLogout = useCallback(async () => {
    setAuthError("");
    await logOut();
    setUser(null);
  }, []);

  return {
    user,
    setUser,
    booting,
    authError,
    setAuthError,
    doLogin,
    doSignup,
    doLogout,
  };
}