import { create } from "zustand";
import { UserId } from "common";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { getRandomUserId, getRandomUserName } from "../utils/randomIds.util.ts";

export interface UserStore {
    localUser: {
        id: UserId;
        name: string;
    };
    setUserId: (id: UserId) => void;
    setUserName: (name: string) => void;
}

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                localUser: {
                    id: getRandomUserId(),
                    name: getRandomUserName(),
                },

                setUserId: (id: UserId) =>
                    set((state) => {
                        return {
                            localUser: { ...state.localUser, id },
                        };
                    }),
                setUserName: (name: string) =>
                    set((state) => {
                        return {
                            localUser: { ...state.localUser, name },
                        };
                    }),
            }),
            { name: "UserStore" },
        ),
        { enabled: __DEV_MODE__, name: "UserStore" },
    ),
);

console.log("Persist UserStore on init");
useUserStore.setState(useUserStore.getState());
