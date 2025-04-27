import { create } from "zustand";
import { Room } from "common";
import { devtools } from "zustand/middleware";

export interface RoomExtended extends Room {
    isError: boolean;
    isLoading: boolean;
}

export interface RoomStore {
    room: RoomExtended;
    setRoom: (room: Room) => void;
}

export const useRoomStore = create<RoomStore>()(
    devtools(
        (set) => ({
            room: {
                votes: {},
                users: {},
            },

            setRoom: (newRoom: RoomExtended) =>
                set(() => {
                    return {
                        room: newRoom,
                    };
                }),
        }),
        { enabled: __DEV_MODE__, name: "RoomStore" },
    ),
);
