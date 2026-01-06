import dotenv from "dotenv";
dotenv.config();

import { qdrant } from "../config/qdrant.js";

async function main() {
    console.log("🔧 Creating Qdrant payload indexes...");

    // CITY (keyword filter)
    await qdrant.createPayloadIndex("hotels", {
        field_name: "city",
        field_schema: "keyword",
    });

    // PRICE (range filter)
    await qdrant.createPayloadIndex("hotels", {
        field_name: "price",
        field_schema: "float",
    });

    // OPTIONAL but recommended (future-proof)
    await qdrant.createPayloadIndex("hotels", {
        field_name: "rating",
        field_schema: "float",
    });

    console.log("✅ Payload indexes created successfully");
}

main().catch((err) => {
    console.error("❌ Failed to create payload indexes:", err);
    process.exit(1);
});
