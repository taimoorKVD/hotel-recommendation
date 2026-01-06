import { createEmbedding } from "./embedding.service.js";
import { buildUserPreferenceText } from "./feedback.service.js";

const userVectors = new Map(); // in-memory cache (swap for Redis later)

export async function getUserVector(user_id) {
    if (userVectors.has(user_id)) {
        return userVectors.get(user_id);
    }

    const texts = await buildUserPreferenceText(user_id);
    if (!texts.length) return null;

    const vector = await createEmbedding(texts.join("\n"));
    userVectors.set(user_id, vector);

    return vector;
}
