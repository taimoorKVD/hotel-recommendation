import { semanticHotelSearch } from "./vectorSearch.service.js";
import { getHotelsForSearch } from "../repositories/hotels.repo.js";
import { checkAvailability } from "./availability.service.js";
import { extractUserIntent } from "./intent.service.js";
import { safeJsonParse } from "../utils/json.js";
import { buildHybridScores } from "./scoring.service.js";
import { haversineDistance } from "../utils/geo.js";
import { CITY_CENTRES } from "../utils/cityCentres.js";

export async function searchHotels(params) {
    const {
        query,
        check_in,
        check_out,
        guests,
        city,
        min_price,
        max_price,
        min_rating,
        page = 1,
        page_size = 10,
        ab_group = "A",
        userHistory = [],
    } = params;

    const intent = extractUserIntent(query);
    const offset = (page - 1) * page_size;

    // 1️⃣ Vector recall with Qdrant filtering
    const vectorResults = await semanticHotelSearch({
        query,
        city,
        min_price,
        max_price,
        limit: Math.max(page_size * (page + 1), 30),
        userHistory,
    });

    // 2️⃣ Fetch hotels
    const allHotels = await getHotelsForSearch();
    let hotels = allHotels.map(h => ({
        ...h,
        amenities: safeJsonParse(h.amenities),
    }));

    // 3️⃣ Hard filters
    if (city) hotels = hotels.filter(h => h.city === city);
    if (min_price) hotels = hotels.filter(h => h.price_per_night >= min_price);
    if (max_price) hotels = hotels.filter(h => h.price_per_night <= max_price);
    if (min_rating) hotels = hotels.filter(h => h.star_rating >= min_rating);

    if (!hotels.length) return { page, page_size, total: 0, hotels: [] };

    const hotelMap = new Map(hotels.map(h => [h.id, h]));

    // 4️⃣ Geo scoring
    const geoScores = new Map();
    if (city && CITY_CENTRES[city]) {
        for (const h of hotels) {
            const d = haversineDistance(
                h.latitude,
                h.longitude,
                CITY_CENTRES[city].lat,
                CITY_CENTRES[city].lng
            );
            geoScores.set(h.id, 1 / (1 + d));
        }
    }

    // 5️⃣ Hybrid ranking
    let ranked = buildHybridScores({
        vectorResults,
        hotelMap,
        intent,
        geoScores,
        ab_group,
    });

    // 6️⃣ Availability
    if (check_in && check_out) {
        ranked = await checkAvailability(ranked, check_in, check_out, guests);
    }

    return {
        page,
        page_size,
        total: ranked.length,
        hotels: ranked.slice(offset, offset + page_size),
    };
}
