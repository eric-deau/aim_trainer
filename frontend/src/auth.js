import strings from "./lang/en/en.json";
import readJson from "./utility/utils.js"

const SIGNUP_ROUTE = import.meta.env.VITE_SIGNUP_ROUTE;
const LOGIN_ROUTE = import.meta.env.VITE_LOGIN_ROUTE;
const VALID_SESSION_ROUTE = import.meta.env.VITE_VALID_SESSION_ROUTE;

export async function signUp(username, password) {
    const res = await fetch(SIGNUP_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || strings["failedSignup"]);
    return data.user;
}

export async function login(username, password) {
    const res = await fetch(LOGIN_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || strings["failedLogin"]);
    return data.user;
}

export async function validSession() {
    const res = await fetch(VALID_SESSION_ROUTE, {
        credentials: "include",
    });

    const data = await readJson(res);
    return data.user ?? null;
}

export async function logOut() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });

    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || strings["failedLogout"]);
    return true;
}