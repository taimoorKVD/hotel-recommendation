import mysql from "mysql2/promise";
import { dbConfig, createPool, setPool } from "../config/db.js";
import { createHotelsTable, createRoomsTable, createBookingsTable } from "./schema.js";
import { seedData } from "./seed.js";

export async function initDatabase() {
    // Create DB if not exists (connection without DB)
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.end();
    console.log("✓ Database created/verified");

    // Pool with DB
    const pool = await createPool();
    setPool(pool);

    await pool.query(createHotelsTable);
    await pool.query(createRoomsTable);
    await pool.query(createBookingsTable);
    console.log("✓ Tables created successfully");

    await seedData(pool);
    console.log("✓ Database initialised successfully");

    return pool;
}
