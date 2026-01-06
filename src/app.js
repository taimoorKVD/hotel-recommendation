import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use(routes);

    return app;
}
