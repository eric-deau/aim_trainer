import { readJson } from "./utility/utils.js"

export async function submitRun(run) {
    const res = await fetch("/api/submit-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(run),
    });

    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || "Failed to submit run");
    return data;
}