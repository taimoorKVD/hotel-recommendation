import { getWeights } from "../repositories/weights.repo.js";

export async function buildHybridScores({
                                            vectorResults,
                                            hotelMap,
                                            intent,
                                            geoScores,
                                            ab_group,
                                        }) {
    const learned =
        (await getWeights(ab_group)) || {
            vector_weight: 0.5,
            price_weight: 0.2,
            rating_weight: 0.2,
            geo_weight: 0.1,
        };

    return vectorResults
        .map(v => {
            const hotel = hotelMap.get(v.hotel_id);
            if (!hotel) return null;

            const geo = geoScores.get(hotel.id) ?? 1;

            return {
                ...hotel,
                final_score:
                    v.score * learned.vector_weight +
                    (1 / hotel.price_per_night) * learned.price_weight +
                    (hotel.star_rating / 5) * learned.rating_weight +
                    geo * learned.geo_weight,
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.final_score - a.final_score);
}
