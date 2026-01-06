import { getPool } from "../config/db.js";

export async function getGroupPerformance(days = 14) {
    const pool = getPool();

    const [rows] = await pool.query(
        `
    SELECT
      ab_group,
      SUM(event_type = 'impression') AS impressions,
      SUM(event_type = 'booking')    AS bookings
    FROM user_events
    WHERE created_at >= NOW() - INTERVAL ? DAY
    GROUP BY ab_group
    `,
        [days]
    );

    return rows.map(r => ({
        ab_group: r.ab_group,
        conversion_rate:
            r.impressions > 0 ? r.bookings / r.impressions : 0,
    }));
}
