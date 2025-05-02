import { RoomId, UserAction, UserId } from "common";

export type UserActionStrategy = (roomId: RoomId, userId: UserId, userAction: UserAction<unknown>) => void;
