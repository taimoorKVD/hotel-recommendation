import {getPool} from "../config/db.js";

/**
 * Create a booking record
 */
export async function createBooking(payload) {
    const pool = getPool();

    const {
        hotel_id,
        room_id,
        guest_name,
        guest_email,
        check_in,
        check_out,
        num_guests,
        total_price,
    } = payload;

    const [result] = await pool.query(
        `
            INSERT INTO bookings (hotel_id,
                                  room_id,
                                  guest_name,
                                  guest_email,
                                  check_in,
                                  check_out,
                                  num_guests,
                                  total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            hotel_id,
            room_id,
            guest_name,
            guest_email,
            check_in,
            check_out,
            num_guests,
            total_price,
        ]
    );

    return result.insertId;
}

/**
 * Get price per night for a room
 * Used during booking price calculation
 */
export async function getRoomPrice(room_id) {
    const pool = getPool();

    const [rows] = await pool.query(
        `
            SELECT price_per_night
            FROM rooms
            WHERE id = ?
            LIMIT 1
        `,
        [room_id]
    );

    if (!rows.length) {
        throw new Error("Room not found");
    }

    return Number(rows[0].price_per_night);
}
