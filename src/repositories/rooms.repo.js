import { getPool } from "../config/db.js";

export async function getRoomsByHotelId(hotelId) {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM rooms WHERE hotel_id = ?", [hotelId]);
    return rows;
}

export async function getRoomPriceById(roomId) {
    const pool = getPool();
    const [rows] = await pool.query("SELECT price_per_night FROM rooms WHERE id = ?", [roomId]);
    return rows[0] || null;
}

export async function getAvailabilityByHotel(hotelId, checkIn, checkOut, guests = 1) {
    const pool = getPool();
    const [rows] = await pool.query(
        `
    SELECT r.id, r.available_rooms, COUNT(b.id) as booked
    FROM rooms r
    LEFT JOIN bookings b ON r.id = b.room_id
      AND b.status = 'confirmed'
      AND (
        (b.check_in <= ? AND b.check_out > ?) OR
        (b.check_in < ? AND b.check_out >= ?) OR
        (b.check_in >= ? AND b.check_out <= ?)
      )
    WHERE r.hotel_id = ?
      AND r.capacity >= ?
    GROUP BY r.id
  `,
        [checkIn, checkIn, checkOut, checkOut, checkIn, checkOut, hotelId, guests]
    );

    return rows;
}
