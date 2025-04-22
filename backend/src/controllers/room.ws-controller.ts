import { NextFunction, Request } from "express";
import { WS } from "../utils/utils";
import { createOrJoinRoom } from "../services/room.service";
import { RoomId, UserId } from "common/src/room.model";

interface WsRoomRequestQuery {
    roomId: RoomId;
    userId: UserId;
    userName: string;
}

const wsRoomRouter = (ws: WS, req: Request, next: NextFunction): void => {
    const { roomId, userId, userName } = req.query as unknown as WsRoomRequestQuery;
    console.info(`WS request roomId=${roomId}, userId=${userId} userName=${userName}`);
    try {
        createOrJoinRoom(ws, roomId, userId, userName);
    } catch (e) {
        next(e);
    }
};

export { wsRoomRouter };
