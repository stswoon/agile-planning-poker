import { create } from "zustand";
import { Room } from "common";
import { devtools } from "zustand/middleware";
import { stubBigRoom, stubRoom } from "./stubRoom.const.ts";

export interface RoomExtended extends Room {
    isError: boolean;
    isLoading: boolean;
}

export interface RoomStore {
    room: RoomExtended;
    setRoom: (room: Room) => void;
}

let initialState: Room | undefined = {
    id: "",
    showCards: false,
    createdDate: new Date().getTime(),
    votes: {},
    users: {},
};

const useStubRoom: undefined | "small" | "big" = undefined;
if (useStubRoom === "small") {
    initialState = stubRoom;
} else if (useStubRoom === "big") {
    initialState = stubBigRoom;
}

//TODO: side effects with WS to store

export const useRoomStore = create<RoomStore>()(
    devtools(
        (set) => ({
            room: initialState,

            setRoom: (newRoom: RoomExtended) =>
                set(() => {
                    if (useStubRoom) {
                        return {};
                    }

                    return {
                        room: newRoom,
                    };
                }),
        }),
        { enabled: __DEV_MODE__, name: "RoomStore" },
    ),
);
