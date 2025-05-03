import { RoomId, UserAction, UserId } from "@stswoon/shared";

export type UserActionStrategy = (roomId: RoomId, userId: UserId, userAction: UserAction<unknown>) => void;
