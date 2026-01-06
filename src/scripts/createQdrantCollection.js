import dotenv from "dotenv";
dotenv.config();

import { qdrant } from "../config/qdrant.js";

const COLLECTION = "hotels";
const VECTOR_SIZE = 1536;

async function main() {
    console.log("Using QDRANT_URL:", process.env.QDRANT_URL || "(missing)");
    console.log("Has QDRANT_API_KEY:", process.env.QDRANT_API_KEY ? "YES" : "NO");

    // If collection already exists, don't crash
    const collections = await qdrant.getCollections();
    const exists = collections.collections?.some(c => c.name === COLLECTION);

    if (exists) {
        console.log(`✅ Collection "${COLLECTION}" already exists`);
        return;
    }

    await qdrant.createCollection(COLLECTION, {
        vectors: { size: VECTOR_SIZE, distance: "Cosine" },
    });

    console.log(`✅ Collection "${COLLECTION}" created`);
}

main().catch((err) => {
    console.error("❌ Failed:", err?.message || err);
    process.exit(1);
});
