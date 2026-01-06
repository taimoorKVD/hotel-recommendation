import { getAvailabilityByHotel } from "../repositories/rooms.repo.js";

export async function checkAvailability(hotels, checkIn, checkOut, guests) {
    const available = [];

    for (const hotel of hotels) {
        const bookings = await getAvailabilityByHotel(hotel.id, checkIn, checkOut, guests || 1);
        const hasAvailability = bookings.some((b) => b.available_rooms > b.booked);

        if (hasAvailability) {
            available.push({ ...hotel, available_rooms: bookings });
        }
    }

    return available;
}
