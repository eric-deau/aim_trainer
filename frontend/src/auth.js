import strings from "./lang/en/en.json";
import { readJson } from "./utility/utils.js"

const SIGNUP_ROUTE = import.meta.env.VITE_SIGNUP_ROUTE;
const LOGIN_ROUTE = import.meta.env.VITE_LOGIN_ROUTE;
const VALID_SESSION_ROUTE = import.meta.env.VITE_VALID_SESSION_ROUTE;
const LOGOUT_ROUTE = import.meta.env.VITE_LOGOUT_ROUTE;
const CHANGE_PASSWORD_ROUTE = import.meta.env.VITE_CHANGE_PASSWORD_ROUTE;

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

export async function login(username, password, remember) {
    const res = await fetch(LOGIN_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password, remember }),
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
    const res = await fetch(LOGOUT_ROUTE, {
        method: "POST",
        credentials: "include",
    });

    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || strings["failedLogout"]);
    return true;
}

export async function changePassword(current_password, new_password) {
  const res = await fetch(CHANGE_PASSWORD_ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ current_password, new_password }),
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(data.error || "Failed to change password");
  return true;
}