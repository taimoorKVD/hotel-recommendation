import { Router } from "express";
import { search } from "../controllers/search.controller.js";

const router = Router();
router.post("/search", search);
export default router;
