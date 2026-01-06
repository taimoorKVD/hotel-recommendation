import { getHotelById, getRoomsByHotelId } from "../repositories/hotels.repo.js";
import { logEvent } from "../repositories/events.repo.js";
import { safeJsonParse } from "../utils/json.js";

export async function getHotel(req, res) {
    try {
        const hotelId = Number(req.params.id);
        const user_id = req.headers["x-user-id"] || "anon";
        const ab_group = req.headers["x-ab-group"] || "A";

        // 🔹 Log CLICK event (non-blocking)
        logEvent({
            user_id,
            hotel_id: hotelId,
            event_type: "click",
            ab_group,
        }).catch(() => {});

        // 🔹 Fetch hotel
        const hotel = await getHotelById(hotelId);
        if (!hotel) {
            return res.status(404).json({ error: "Hotel not found" });
        }

        hotel.amenities = safeJsonParse(hotel.amenities);

        // 🔹 Fetch rooms
        const rooms = await getRoomsByHotelId(hotelId);
        rooms.forEach(r => {
            r.room_amenities = safeJsonParse(r.room_amenities);
        });

        res.json({
            success: true,
            hotel: {
                ...hotel,
                rooms,
            },
        });

    } catch (error) {
        console.error("❌ Get hotel failed:", error);
        res.status(500).json({
            error: "Failed to fetch hotel details",
        });
    }
}
export const getById = getHotel;
