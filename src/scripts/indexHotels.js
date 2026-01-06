import dotenv from "dotenv";
dotenv.config();

import { initDatabase } from "../db/init.js";
import { qdrant } from "../config/qdrant.js";
import { createEmbedding } from "../services/embedding.service.js";
import { buildHotelDocument } from "../utils/hotelDocument.js";
import { getHotelsForSearch } from "../repositories/hotels.repo.js";
import { safeJsonParse } from "../utils/json.js";

const COLLECTION = "hotels";

async function main() {
    console.log("🔌 Initialising database...");
    await initDatabase(); // ✅ THIS WAS MISSING

    console.log("📥 Fetching hotels from MySQL...");
    const hotels = await getHotelsForSearch();

    console.log(`🏨 Found ${hotels.length} hotels`);

    let indexed = 0;

    for (const hotel of hotels) {
        hotel.amenities = safeJsonParse(hotel.amenities);

        const document = buildHotelDocument(hotel);
        const vector = await createEmbedding(document);

        await qdrant.upsert(COLLECTION, {
            points: [
                {
                    id: hotel.id, // IMPORTANT: must match MySQL hotel.id
                    vector,
                    payload: {
                        city: hotel.city,
                        country: hotel.country,
                        price: Number(hotel.price_per_night),
                        rating: Number(hotel.star_rating),
                        type: hotel.hotel_type,
                    },
                },
            ],
        });

        indexed++;
        if (indexed % 10 === 0) {
            console.log(`✅ Indexed ${indexed}/${hotels.length}`);
        }
    }

    console.log(`🎉 Successfully indexed ${indexed} hotels into Qdrant`);
    process.exit(0);
}

main().catch((err) => {
    console.error("❌ Indexing failed:", err);
    process.exit(1);
});
