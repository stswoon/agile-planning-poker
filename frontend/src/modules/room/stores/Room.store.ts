import { create } from "zustand";
import { DtoRoom } from "shared";
import { devtools } from "zustand/middleware";
import { RoomStore } from "../models/RoomStore.model.ts";
import { RoomExtended } from "../models/RoomWithLoading.model.ts";

const initialState: DtoRoom | undefined = {
    id: "",
    showCards: false,
    usersAndVotes: [],
};

export const useRoomStore = create<RoomStore>()(
    devtools(
        (set) => ({
            room: initialState,

            setRoom: (newRoom: RoomExtended) =>
                set(() => {
                    return { room: newRoom };
                }),
        }),
        { enabled: __DEV_MODE__, name: "RoomStore" },
    ),
);
