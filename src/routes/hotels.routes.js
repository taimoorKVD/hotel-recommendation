import { Router } from "express";
import { getById } from "../controllers/hotels.controller.js";

const router = Router();
router.get("/hotels/:id", getById);
export default router;
