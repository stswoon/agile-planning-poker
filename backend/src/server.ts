import express from "express";
import config from "./config/config";
import { errorHandler } from "./middlewares/errorHandler";
import { itemRouter } from "./controllers/item.controller";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + "/public", { extensions: ["html"] }));
app.get("/health", (_, res) => {
    res.send("OK");
});

// Routes
app.use("/api/items", itemRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

app.listen(config.port, (error) => {
    if (error) {
        console.log("Fail to start server", error);
        throw error;
    }
    console.log(`Server running on port ${config.port}`);
});
