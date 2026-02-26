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
