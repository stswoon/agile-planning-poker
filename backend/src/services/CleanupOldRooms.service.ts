import { RoomId, utils } from "@stswoon/shared";
import { roomRepository } from "../repositories/Room.repository";
import { roomUserWsMappingService } from "./RoomUserWsMapping.service";
import { ROOM_CLEANUP_PERIOD, ROOM_TTL } from "../constants/constants";

const cleanupOldRoomsService = (): void => {
    const oldDate = utils.now() - ROOM_TTL;
    const roomIds: RoomId[] = roomRepository.getRoomIdsOlderThenDate(oldDate);
    console.info("Found old rooms: " + roomIds.join(", "));
    roomIds.forEach((id) => {
        console.log(`Remove old room (${id})`);
        roomRepository.removeRoom(id);
        Object.values(roomUserWsMappingService.getUsersByRoom(id)).forEach((ws) => ws.close());
        roomUserWsMappingService.removeRoom(id);
    });
};

export const startCleanupOldRooms = (): void => {
    console.info(`Start shrinkage old rooms with period = ${ROOM_CLEANUP_PERIOD}`);
    cleanupOldRoomsService();
    setInterval(() => cleanupOldRoomsService(), ROOM_CLEANUP_PERIOD);
};
