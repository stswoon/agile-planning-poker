import { create } from "zustand";
import { UserId } from "shared";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { getRandomShortId, getRandomUserName } from "../common/utils/Random.util.ts";
import { UserStore } from "./UserStore.model.ts";

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                localUser: {
                    id: getRandomShortId(),
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
