import { getPool } from "../config/db.js";

/**
 * Get a single hotel by ID
 */
export async function getHotelById(hotelId) {
    const pool = getPool();

    const [rows] = await pool.query(
        `
    SELECT *
    FROM hotels
    WHERE id = ?
    LIMIT 1
    `,
        [hotelId]
    );

    return rows[0] || null;
}

/**
 * Get all rooms for a hotel
 */
export async function getRoomsByHotelId(hotelId) {
    const pool = getPool();

    const [rows] = await pool.query(
        `
    SELECT *
    FROM rooms
    WHERE hotel_id = ?
    ORDER BY price_per_night ASC
    `,
        [hotelId]
    );

    return rows;
}

/**
 * Used by search & indexing
 */
export async function getHotelsForSearch() {
    const pool = getPool();

    const [rows] = await pool.query(`
    SELECT h.*,
           GROUP_CONCAT(DISTINCT r.room_type) AS room_types,
           MIN(r.price_per_night) AS min_room_price
    FROM hotels h
    LEFT JOIN rooms r ON h.id = r.hotel_id
    GROUP BY h.id
  `);

    return rows;
}

export async function getCities() {
    const pool = getPool();

    const [rows] = await pool.query(
        `
    SELECT DISTINCT city, country
    FROM hotels
    ORDER BY city
    `
    );

    return rows;
}
