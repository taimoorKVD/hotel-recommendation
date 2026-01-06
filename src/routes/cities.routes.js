import { Router } from "express";
import { getAll } from "../controllers/cities.controller.js";

const router = Router();
router.get("/cities", getAll);
export default router;
