import { UserId } from "@stswoon/shared";

export interface UserStore {
    localUser: {
        id: UserId;
        name: string;
    };
    setUserId: (id: UserId) => void;
    setUserName: (name: string) => void;
}
