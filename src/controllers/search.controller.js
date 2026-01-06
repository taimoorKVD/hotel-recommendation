import { searchHotels } from "../services/search.service.js";
import { logEvent } from "../repositories/events.repo.js";

export async function search(req, res) {
    const ab_group = req.headers["x-ab-group"] || "A";
    const user_id = req.headers["x-user-id"] || "anon";

    const result = await searchHotels({
        ...req.body,
        ab_group,
        user_id,
    });

    // 🔴 Non-blocking impression logging
    result.hotels.forEach(hotel => {
        logEvent({
            user_id,
            hotel_id: hotel.id,
            event_type: "impression",
            ab_group,
        }).catch(() => {});
    });

    res.json({ success: true, ab_group, ...result });
}
