import { RoomId, UserId, JsMap, UserAction } from "common";
import { WS } from "../utils/utils";
import { startCleanupOldRooms } from "../utils/cleanupOldRooms";
import { roomUserWsMappingService } from "./roomUserWsMapping.service";
import { roomRepository } from "../repositories/room.repository";

startCleanupOldRooms();

const LAZY_REMOVE_TIMEOUT = 10 * 1000; //10sec;
const userLateRemoveTimers: JsMap<UserId, NodeJS.Timeout> = {};

export type UserActionStrategy = (roomId: RoomId, userId: UserId, userAction: UserAction<any>) => void;

export function abstractCreateOrJoinRoom(
    ws: WS,
    roomId: RoomId,
    userId: UserId,
    userName: string,
    userActionCallback: UserActionStrategy,
): void {
    if (!roomRepository.isRoomExist(roomId)) {
        console.info(`Create room (${roomId})`);
        roomRepository.createRoom(roomId);
    }

    if (userLateRemoveTimers[userId]) {
        console.log(`Reconnect user ${userName} (${userId}) to room ${roomId}`);
        roomRepository.setUserActivity(roomId, userId, true);
        clearTimeout(userLateRemoveTimers[userId]);
    } else {
        console.log(`Add user ${userName} (${userId}) to room ${roomId}`);
        roomRepository.addUser(roomId, { id: userId, name: userName, active: true });
    }
    roomUserWsMappingService.upsertUser(roomId, userId, ws);

    wsSubscription(ws, roomId, userId, userActionCallback);

    setTimeout(() => {
        console.log(`Broadcast after add user to room (roomId=${roomId})`);
        broadcastRoom(roomId);
    });
}

function wsSubscription(ws: WS, roomId: RoomId, userId: UserId, userActionCallback: UserActionStrategy) {
    const userName = roomRepository.getRoom(userId).users[userId].name;
    console.log(`Subscribe on user actions for ${userName} (${userId}) in room ${roomId}`);
    ws.on("message", (msg: string): void => {
        if (msg === "H") {
            //console.log(`client H for ${userName} (${userId})`);
        } else {
            const userAction = JSON.parse(msg);
            userActionCallback(roomId, userId, userAction);
        }
        broadcastRoom(roomId);
    });
    ws.on("close", () => {
        console.log(`WS for user (${userName} : ${userId}) in room (${roomId}) was closed`);
        roomUserWsMappingService.removeUser(roomId, userId);
        roomRepository.setUserActivity(roomId, userId, false);
        userLateRemoveTimers[userId] = setTimeout(() => {
            console.info(`Lazy remove for user (${userName} : ${userId}) in room (${roomId})`);
            roomRepository.removeUser(roomId, userId);
            delete userLateRemoveTimers[userId];

            broadcastRoom(roomId);

            if (isEmptyRoom(roomId)) {
                console.log(`Room ${roomId} is empty so remove it`);
                roomRepository.removeRoom(roomId);
                roomUserWsMappingService.removeRoom(roomId);
            }
        }, LAZY_REMOVE_TIMEOUT);
    });
    ws.on("error", (e: any) => {
        console.error(`WS for user ${userName} (${userId}) in room (${roomId}) was closed`);
        console.error(e);
    });
}

const broadcastRoom = (roomId: RoomId): void => {
    const userWsMap = roomUserWsMappingService.getUsersByRoom(roomId);
    console.log(`Broadcast room ${roomId} to usersId: [${Object.keys(userWsMap).join(", ")}]`);
    const room = roomRepository.getRoom(roomId);
    Object.values(userWsMap).forEach((ws: WS) => ws.send(JSON.stringify(room)));
};

const isEmptyRoom = (roomId: RoomId): boolean => {
    const room = roomRepository.getRoom(roomId);
    return !Object.keys(room.users).length;
};
