import { NextFunction, Request } from "express";
import { WS } from "../models/Ws.model";
import { createOrJoinRoom } from "../services/Room.service";
import { RoomId, UserId } from "shared";

interface WsRoomRequestQuery {
    roomId: RoomId;
    userId: UserId;
    userName: string;
}

const wsRoomRouter = (ws: WS, req: Request, next: NextFunction): void => {
    try {
        const { roomId, userId, userName } = req.query as unknown as WsRoomRequestQuery;
        console.info(`WS request roomId=${roomId}, userId=${userId} userName=${userName}`);
        if (roomId && userId && userName) {
            createOrJoinRoom(ws, roomId, userId, userName);
        } else {
            next(Error("Bad request"));
        }
    } catch (e) {
        // https://scoutapm.com/blog/express-error-handling
        next(e); //passing to default middleware error handler
    }
};

export { wsRoomRouter };
