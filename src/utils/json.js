export function safeJsonParse(value, fallback = []) {
    if (!value) return fallback;

    // Already parsed (MySQL JSON column may return object)
    if (Array.isArray(value)) return value;

    if (typeof value === "object") return value;

    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch {
            // Legacy comma-separated fallback
            return value
                .split(",")
                .map(v => v.trim())
                .filter(Boolean);
        }
    }

    return fallback;
}
