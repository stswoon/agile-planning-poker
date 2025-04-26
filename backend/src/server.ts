import express from "express";
import cors from "cors";
import compress from "compression";
import expressWs from "express-ws";
import { envConfig } from "./utils/envConfig";
import { errorHandlerMiddleware } from "./utils/errorHandler.middleware";
import { setStaticFilesCacheHeaders } from "./utils/staticFilesCacheHeaders";
import { wsRoomRouter } from "./controllers/room.ws-controller";
import { healthRouter } from "./controllers/health.controller";

const app = express();
const appWs = expressWs(app);

app.use(cors());
app.use(express.json());
app.use(compress());
app.use(
    express.static(__dirname + "/public", {
        extensions: ["html"],
        setHeaders: setStaticFilesCacheHeaders,
    }),
);
app.use("/health", healthRouter);

// WS Routes
appWs.app.ws("/api/room", wsRoomRouter);

// Global error handler (should be after routesConstants)
app.use(errorHandlerMiddleware);

app.listen(envConfig.port, (error) => {
    if (error) {
        console.error("Fail to start server", error);
        throw error;
    }
    console.log(`Server running on port ${envConfig.port}`);
});
