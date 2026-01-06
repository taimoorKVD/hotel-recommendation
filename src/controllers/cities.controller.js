import { listCities } from "../services/cities.service.js";

export async function getAll(req, res) {
    try {
        const cities = await listCities();
        res.json({ success: true, cities });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cities" });
    }
}
