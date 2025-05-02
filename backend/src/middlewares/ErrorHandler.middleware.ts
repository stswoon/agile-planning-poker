import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    status?: number;
}

export const errorHandlerMiddleware = (err: AppError, _: Request, res: Response, __: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
};
