import dotenv from "dotenv";
import {qdrant} from "../config/qdrant.js";
import {createEmbedding} from "../services/embedding.service.js";

dotenv.config();

async function main() {
    const query = "cheap comfortable hotel";

    console.log("🔍 Query:", query);

    const vector = await createEmbedding(query);

    const results = await qdrant.search("hotels", {
        vector,
        limit: 5,
    });

    console.log("📊 Raw Qdrant Results:");
    results.forEach((r, i) => {
        console.log(
            `${i + 1}. hotel_id=${r.id} score=${r.score.toFixed(4)} payload=`,
            r.payload
        );
    });
}

main().catch(console.error);
