import { getPool } from "../config/db.js";

export async function getWeights(ab_group) {
    const pool = getPool();

    const [rows] = await pool.query(
        `SELECT * FROM ranking_weights WHERE ab_group = ? LIMIT 1`,
        [ab_group]
    );

    return rows[0] || null;
}

export async function upsertWeights(ab_group, weights) {
    const pool = getPool();

    await pool.query(
        `
    INSERT INTO ranking_weights
      (ab_group, vector_weight, price_weight, rating_weight, geo_weight)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      vector_weight = VALUES(vector_weight),
      price_weight  = VALUES(price_weight),
      rating_weight = VALUES(rating_weight),
      geo_weight    = VALUES(geo_weight),
      updated_at    = CURRENT_TIMESTAMP
    `,
        [
            ab_group,
            weights.vector,
            weights.price,
            weights.rating,
            weights.geo,
        ]
    );
}
