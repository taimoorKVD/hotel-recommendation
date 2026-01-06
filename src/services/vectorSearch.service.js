import { qdrant } from "../config/qdrant.js";
import { createEmbedding, mergeVectors } from "./embedding.service.js";
import { getUserVector } from "./userVector.service.js";

export async function semanticHotelSearch({
                                              query,
                                              city,
                                              min_price,
                                              max_price,
                                              limit = 30,
                                              user_id,
                                          }) {
    const queryVector = await createEmbedding(query);
    const userVector = user_id ? await getUserVector(user_id) : null;
    const finalVector = mergeVectors(queryVector, userVector);

    const must = [];

    if (city) must.push({ key: "city", match: { value: city } });
    if (min_price || max_price) {
        must.push({
            key: "price",
            range: { gte: min_price ?? undefined, lte: max_price ?? undefined },
        });
    }

    const results = await qdrant.search("hotels", {
        vector: finalVector,
        limit,
        filter: must.length ? { must } : undefined,
    });

    return results.map(r => ({ hotel_id: r.id, score: r.score }));
}
