import { RoomId, UserAction, UserId } from "shared";

export type UserActionStrategy = (roomId: RoomId, userId: UserId, userAction: UserAction<unknown>) => void;
