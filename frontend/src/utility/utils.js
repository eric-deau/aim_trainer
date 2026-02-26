export async function readJson(res) {
    const text = await res.text();
    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return { error: text || strings["invalidJSON"] };
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function withMinimumLoading(fn, minMs = 2000) {
    const start = performance.now();
    try {
        return await fn();
    } finally {
        const elapsed = performance.now() - start;
        if (elapsed < minMs) {
            await sleep(minMs - elapsed);
        }
    }
}

export function passwordRules(pw) {
  const lengthOk = pw.length >= 5;
  const upperOk = /[A-Z]/.test(pw);
  const specialOk = /[^A-Za-z0-9]/.test(pw);

  return { lengthOk, upperOk, specialOk };
}

export function passwordScore(pw) {
  const r = passwordRules(pw);
  return [r.lengthOk, r.upperOk, r.specialOk].filter(Boolean).length; // 0..3
}

export async function getLeaderboardData({ limit = 10, offset = 0 } = {}) {
    try {
        const response = await fetch(`/api/leaderboard?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching leaderboard data: ${error}`);
    }
    
}

export async function getMyRuns({ limit = 25, offset = 0 } = {}) {
  const res = await fetch(`/api/runs?limit=${limit}&offset=${offset}`, {
    credentials: "include",
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(data.error || "Failed to load runs");
  return data.rows || [];
}