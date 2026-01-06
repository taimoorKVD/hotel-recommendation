import { getHotelById } from "../repositories/hotels.repo.js";
import { getRoomsByHotelId } from "../repositories/rooms.repo.js";
import { safeJsonParse } from "../utils/json.js";

export async function getHotelDetails(id) {
    const hotel = await getHotelById(id);
    if (!hotel) return null;

    hotel.amenities = safeJsonParse(hotel.amenities);

    const rooms = await getRoomsByHotelId(id);

    rooms.forEach(room => {
        room.room_amenities = safeJsonParse(room.room_amenities);
    });

    return { ...hotel, rooms };
}
