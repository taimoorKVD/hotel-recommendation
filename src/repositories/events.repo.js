import {getPool} from "../config/db.js";

export async function logEvent({user_id, hotel_id, event_type, ab_group}) {
    const pool = getPool();
    await pool.query(
        `INSERT INTO user_events (user_id, hotel_id, event_type, ab_group)
         VALUES (?, ?, ?, ?)`,
        [user_id, hotel_id, event_type, ab_group]
    );
}
