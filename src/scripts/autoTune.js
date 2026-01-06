import dotenv from "dotenv";
dotenv.config();

import { initDatabase } from "../db/init.js";
import { autoTuneWeights } from "../services/autoTune.service.js";

await initDatabase();
await autoTuneWeights();

process.exit(0);
