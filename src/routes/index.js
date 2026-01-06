import { Router } from "express";
import hotelsRoutes from "./hotels.routes.js";
import searchRoutes from "./search.routes.js";
import bookingsRoutes from "./bookings.routes.js";
import citiesRoutes from "./cities.routes.js";
import debugRoutes from "./debug.routes.js";

const router = Router();

router.use("/api", searchRoutes);
router.use("/api", hotelsRoutes);
router.use("/api", bookingsRoutes);
router.use("/api", citiesRoutes);
router.use("/api", debugRoutes);

export default router;
