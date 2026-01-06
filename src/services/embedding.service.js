import { openai } from "../config/openai.js";

export async function createEmbedding(text) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    return response.data[0].embedding;
}

export function mergeVectors(queryVector, userVector, alpha = 0.7) {
    if (!userVector) return queryVector;

    return queryVector.map(
        (v, i) => v * alpha + userVector[i] * (1 - alpha)
    );
}
