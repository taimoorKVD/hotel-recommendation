import mysql from "mysql2/promise";
import { env } from "./env.js";

export const dbConfig = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
};

let pool = null;

export function setPool(newPool) {
    pool = newPool;
}

export function getPool() {
    if (!pool) throw new Error("DB pool not initialised. Call initDatabase() first.");
    return pool;
}

export async function createPool() {
    return mysql.createPool(dbConfig);
}
