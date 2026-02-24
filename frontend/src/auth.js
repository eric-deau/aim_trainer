require('dotenv').config();
const strings = require("./lang/en/en.json");

async function readJson(res) {
    const text = res.text;
    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return { error: text || strings["invalidJSON"] };
    };
};

export async function signUp(username, password) {
    const res = await fetch(process.env.SIGNUP_ROUTE, {
        method: "POST",
        header: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || strings["failedSignup"]);
    return data.user;
}

export async function login(username, password) {
    const res = await fetch(process.env.LOGIN_ROUTE, {
        method: "POST",
        header: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || strings["failedLogin"]);
    return data.user;
}

export async function validSession() {
    const res = await fetch(process.env.VALID_SESSION_ROUTE, { credentials: "include" });
    const data = await readJson(res);
    if (!data.user) throw new Error(data.error || strings["noSession"]);
    return data.user ?? null;
}

export async function logout() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });
    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || strings["failedLogout"]);
    return true;
}