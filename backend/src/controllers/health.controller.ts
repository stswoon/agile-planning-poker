import { Request, Response, NextFunction } from "express";
import { Router } from "express";

const getHealth = (_: Request, res: Response, next: NextFunction) => {
    try {
        res.send("OK");
        console.log("health check");
    } catch (e) {
        next(e);
    }
};

const healthRouter = Router();
healthRouter.get("/", getHealth);

export { healthRouter };
