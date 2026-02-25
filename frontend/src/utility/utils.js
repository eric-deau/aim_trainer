export default async function readJson(res) {
    const text = await res.text();
    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return { error: text || strings["invalidJSON"] };
    }
}
