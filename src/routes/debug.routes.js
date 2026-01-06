import { Router } from "express";
import { semanticHotelSearch } from "../services/vectorSearch.service.js";

const router = Router();

router.get("/debug/semantic", async (req, res) => {
    const q = req.query.q || "cheap hotel";
    const results = await semanticHotelSearch(q, 10);
    res.json(results);
});

export default router;
