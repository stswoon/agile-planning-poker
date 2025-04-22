import { RoomId } from "common";
import { utils } from "./utils";
import { roomRepository } from "../repositories/room.repository";
import { roomUserWsMappingService } from "../services/roomUserWsMapping.service";

const ROOM_LIVE_TIMEOUT = 8 * 60 * 60 * 1000; //8h
const CLEANUP_PERIOD = 60 * 60 * 1000; //1h

const cleanupOldRooms = (): void => {
    const oldDate = utils.now() - ROOM_LIVE_TIMEOUT;
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
    console.info(`Start shrinkage old rooms with period = ${CLEANUP_PERIOD}`);
    cleanupOldRooms();
    setInterval(() => cleanupOldRooms(), CLEANUP_PERIOD);
};
