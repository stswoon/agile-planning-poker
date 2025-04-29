import { JsMap } from "./common.model";

export type RoomId = string;
export type UserId = string;

export interface Room {
    id: RoomId;
    createdDate: number;

    showCards: boolean;
    users: JsMap<UserId, User>; //TODO migrate to list
    votes: JsMap<UserId, Vote>//TODO migrate to list
}

export interface User {
    id: UserId;
    name: string;
    active: boolean;
}

export interface Vote {
    userId: UserId
    cardValue?: string | number
    rotateAngle?: number
}

