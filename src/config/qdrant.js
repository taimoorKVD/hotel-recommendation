import dotenv from "dotenv";

import { QdrantClient } from "@qdrant/js-client-rest";

dotenv.config();

export const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL,          // must be your cloud URL
    apiKey: process.env.QDRANT_API_KEY,   // must be your cloud key
    checkCompatibility: false,            // avoids version check issues
});