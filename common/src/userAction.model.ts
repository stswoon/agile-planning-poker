import { Vote } from "./room.model";

export interface UserAction<T> {
    type: "flipCards" | "clearCards" | "vote";
    payload: T;
}

export interface FlipCardUserAction extends Omit<UserAction<never>, 'payload'>  {
    type: "flipCards";
}

export interface ClearCardsUserAction extends Omit<UserAction<never>, 'payload'> {
    type: "clearCards";
}

export interface VoteUserAction extends UserAction<Omit<Vote, "rotateAngle">> {
    type: "vote";
    payload: Vote;
}