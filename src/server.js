import {env} from "./config/env.js";
import {initDatabase} from "./db/init.js";
import {createApp} from "./app.js";

async function startServer() {
    try {
        await initDatabase();

        const app = createApp();

        app.listen(env.PORT, () => {
            console.log(`
                ╔════════════════════════════════════════════════════════════════╗
                ║   🏨 AI Hotel Recommendation System                            ║
                ║   ✓ Server running on http://localhost:${env.PORT}             ║
                ║   ✓ Database initialised with seeded hotels                    ║
                ║   ✓ Ready to accept requests                                   ║
                ╚════════════════════════════════════════════════════════════════╝
                
                API Endpoints:
                - POST /api/search
                - GET  /api/hotels/:id
                - POST /api/bookings
                - GET  /api/cities
            `);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
