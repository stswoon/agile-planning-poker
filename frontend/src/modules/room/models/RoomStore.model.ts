import { RoomExtended } from "./RoomWithLoading.model.ts";

export interface RoomStore {
    room: RoomExtended;
    setRoom: (room: RoomExtended) => void;
}
