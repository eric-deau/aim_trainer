import { useCallback, useState } from "react";
import { validSession, login, signUp, logOut } from "../auth.js";
import strings from "../lang/en/en.json"

export function useAuth() {
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState("");
    
    async function checkSession() {
        try {
            const u = await validSession();
            setUser(u);
        } catch (err) {
            setAuthError(err?.message || strings["failedSessionCheck"]);
        } 
    }

    const doLogin = useCallback(async (username, password, remember) => {
        setAuthError("");
        const u = await login(username, password, remember);
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
        authError,
        setAuthError,
        doLogin,
        doSignup,
        doLogout,
        checkSession,
    };
}