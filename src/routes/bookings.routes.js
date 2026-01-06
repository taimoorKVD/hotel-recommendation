import { Router } from "express";
import { create } from "../controllers/bookings.controller.js";

const router = Router();
router.post("/bookings", create);
export default router;
