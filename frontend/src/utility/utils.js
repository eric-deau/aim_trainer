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

    // const elapsed = performance.now() - start;

    // if (elapsed < minMs) {
    //     await sleep(minMs - elapsed);
    // }

    // return result;
}
