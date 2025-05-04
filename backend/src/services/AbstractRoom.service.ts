import { RoomId, UserId, JsMap, DtoRoom, Room, UserAndVote } from "@stswoon/shared";
import { startCleanupOldRooms } from "./CleanupOldRooms.service";
import { roomUserWsMappingService } from "./RoomUserWsMapping.service";
import { roomRepository } from "../repositories/Room.repository";
import { UserActionStrategy } from "../models/UserActionStrategy.model";
import { REMOVE_USER_AFTER_INACTIVE_TIMEOUT } from "../constants/constants";
import { WS } from "../models/Ws.model";

startCleanupOldRooms();

const userLateRemoveTimers: JsMap<UserId, JsMap<RoomId, NodeJS.Timeout>> = {};

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

    if (userLateRemoveTimers[userId]?.[roomId] && roomRepository.getRoom(roomId).users[userId]) {
        console.log(`Reconnect user ${userName} (${userId}) to room ${roomId}`);
        roomRepository.setUserActivity(roomId, userId, true);
    } else {
        console.log(`Add user ${userName} (${userId}) to room ${roomId}`);
        roomRepository.addUser(roomId, { id: userId, name: userName, active: true });
    }
    removeUserLateRemoveTimers(userId, roomId);
    roomUserWsMappingService.upsertUser(roomId, userId, ws);

    wsSubscription(ws, roomId, userId, userActionCallback);

    setTimeout(() => {
        console.log(`Broadcast after add user to room (roomId=${roomId})`);
        broadcastRoom(roomId);
    });
}

function wsSubscription(ws: WS, roomId: RoomId, userId: UserId, userActionCallback: UserActionStrategy) {
    const users = roomRepository.getRoom(roomId).users;
    const userName = users[userId].name;
    console.log(`Subscribe on user actions for ${userName} (${userId}) in room ${roomId}`);
    ws.on("message", (msg: string): void => {
        try {
            if (msg === "H") {
                //console.log(`client H for ${userName} (${userId})`);
            } else {
                const userAction = JSON.parse(msg);
                userActionCallback(roomId, userId, userAction);
                broadcastRoom(roomId);
            }
        } catch (e) {
            console.error("Failed read message from client");
            console.error(e);
        }
    });
    ws.on("close", (a, b) => {
        try {
            console.log(`WS for user (${userName} : ${userId}) in room (${roomId}) was closed`);
            console.log(a, b);
            roomUserWsMappingService.removeUser(roomId, userId);
            roomRepository.setUserActivity(roomId, userId, false);
            userLateRemoveTimers[userId] = userLateRemoveTimers[userId] ?? {};
            userLateRemoveTimers[userId][roomId] = setTimeout(() => {
                try {
                    if (!userLateRemoveTimers[userId]?.[roomId]) {
                        console.warn(
                            `Timeout for userId was cleared so skip deletion user ${userName} (${userId}) from room ${roomId}`,
                        );
                        return;
                    }

                    console.info(`Lazy remove for user (${userName} : ${userId}) in room (${roomId})`);
                    roomRepository.removeUser(roomId, userId);
                    removeUserLateRemoveTimers(userId, roomId);

                    broadcastRoom(roomId);

                    // will remove in startCleanupOldRooms
                    // if (isEmptyRoom(roomId)) {
                    //     console.log(`Room ${roomId} is empty so remove it`);
                    //     roomRepository.removeRoom(roomId);
                    //     roomUserWsMappingService.removeRoom(roomId);
                    // }
                } catch (e) {
                    console.error("Failed read message from client");
                    console.error(e);
                }
            }, REMOVE_USER_AFTER_INACTIVE_TIMEOUT);
        } catch (e) {
            console.error("Failed read message from client");
            console.error(e);
        }
    });
    ws.on("error", (e: any) => {
        console.error(`WS for user ${userName} (${userId}) in room (${roomId}) was closed`);
        console.error(e);
    });
}

function broadcastRoom(roomId: RoomId): void {
    const userWsMap = roomUserWsMappingService.getUsersByRoom(roomId);
    console.log(`Broadcast room ${roomId} to usersId: [${Object.keys(userWsMap).join(", ")}]`);
    const room = roomRepository.getRoom(roomId);
    const dtoRoom: DtoRoom = convertRoomToDto(room);
    if (dtoRoom.showCards) {
        console.debug("showCards");
    }
    Object.values(userWsMap).forEach((ws: WS) => ws.send(JSON.stringify(dtoRoom)));
}

function convertRoomToDto(room: Room): DtoRoom {
    const userAndVotes: UserAndVote[] = Object.values(room.users).map((user) => {
        return {
            user,
            vote: room.votes?.[user.id],
        };
    });
    return {
        id: room.id,
        showCards: room.showCards,
        usersAndVotes: userAndVotes,
    };
}

function removeUserLateRemoveTimers(userId: UserId, roomId: RoomId): void {
    clearTimeout(userLateRemoveTimers[userId]?.[roomId]);
    delete userLateRemoveTimers[userId]?.[roomId];
    if (userLateRemoveTimers[userId] && Object.keys(userLateRemoveTimers[userId]).length === 0) {
        delete userLateRemoveTimers[userId];
    }
}

// const isEmptyRoom = (roomId: RoomId): boolean => {
//     const room = roomRepository.getRoom(roomId);
//     return !Object.keys(room.users).length;
// };
