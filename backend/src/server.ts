import express from "express";
import cors from "cors";
import compress from "compression";
import expressWs from "express-ws";
import { envConfig } from "./utils/EnvironmentConfig.util";
import { errorHandlerMiddleware } from "./middlewares/ErrorHandler.middleware";
import { setStaticFilesCacheHeaders } from "./utils/StaticFilesCacheHeaders.utils";
import { wsRoomRouter } from "./controllers/Room.ws-controller";
import { healthRouter } from "./controllers/Health.controller";
import { Request, Response, NextFunction } from "express";
import path from "node:path";

const app = express();
const appWs = expressWs(app);

app.use(cors());
app.use(express.json());
app.use(compress());
app.use("/health", healthRouter);

//statics
app.use(
    express.static(__dirname + "/public", {
        extensions: ["html"],
        setHeaders: setStaticFilesCacheHeaders,
    }),
);

// WS Routes
appWs.app.ws("/api/room", wsRoomRouter);

//catch all routes for SPA (route /* cause error)
app.get(/.*/, (_: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
        if (err) {
            next(err);
        }
    });
});

// Global error handler (should be after routesConstants)
app.use(errorHandlerMiddleware);

app.listen(envConfig.port, (error) => {
    if (error) {
        console.error("Fail to start server", error);
        throw error;
    }
    console.info(`Server running on port ${envConfig.port}`);
});
