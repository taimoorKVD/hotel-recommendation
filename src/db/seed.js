import moment from "moment";
import { generateHotelData } from "./sampleData.js";

export async function seedData(pool) {
    const [existingHotels] = await pool.query("SELECT COUNT(*) as count FROM hotels");
    if (existingHotels[0].count > 0) {
        console.log("✓ Data already seeded");
        return;
    }

    const hotels = generateHotelData();

    for (const hotel of hotels) {
        const [result] = await pool.query(
            `INSERT INTO hotels (name, description, city, country, address, star_rating,
                           price_per_night, amenities, hotel_type, image_url, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                hotel.name,
                hotel.description,
                hotel.city,
                hotel.country,
                hotel.address,
                hotel.star_rating,
                hotel.price_per_night,
                JSON.stringify(hotel.amenities),
                hotel.hotel_type,
                hotel.image_url,
                hotel.latitude,
                hotel.longitude,
            ]
        );

        const hotelId = result.insertId;

        // Insert rooms and keep their IDs
        const roomIds = [];
        for (const room of hotel.rooms) {
            const [roomRes] = await pool.query(
                `INSERT INTO rooms (hotel_id, room_type, capacity, price_per_night, available_rooms, room_amenities)
         VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    hotelId,
                    room.room_type,
                    room.capacity,
                    room.price_per_night,
                    room.available_rooms,
                    JSON.stringify(room.room_amenities),
                ]
            );
            roomIds.push(roomRes.insertId);
        }

        // Sample booking (FIXED: uses actual room_id not hotelId)
        if (Math.random() > 0.7 && roomIds.length) {
            const checkIn = moment().add(Math.floor(Math.random() * 60), "days").format("YYYY-MM-DD");
            const checkOut = moment(checkIn).add(Math.floor(Math.random() * 7) + 1, "days").format("YYYY-MM-DD");
            const randomRoomId = roomIds[Math.floor(Math.random() * roomIds.length)];

            await pool.query(
                `INSERT INTO bookings (hotel_id, room_id, guest_name, guest_email,
                               check_in, check_out, num_guests, total_price, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    hotelId,
                    randomRoomId,
                    "Sample Guest",
                    "guest@example.com",
                    checkIn,
                    checkOut,
                    2,
                    hotel.price_per_night * 3,
                    "confirmed",
                ]
            );
        }
    }

    console.log(`✓ Seeded ${hotels.length} hotels with rooms and bookings`);
}
