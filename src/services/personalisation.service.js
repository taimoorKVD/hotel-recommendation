import { createEmbedding } from "./embedding.service.js";

export async function buildUserProfileVector(historyTexts = []) {
    if (!historyTexts.length) return null;
    return createEmbedding(historyTexts.join("\n"));
}
