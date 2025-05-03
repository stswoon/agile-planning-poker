import { Vote } from "./Room.model";

export enum UserActionType {
    flipCards = "flipCards",
    clearCards = "clearCards",
    vote = "vote",
}

export interface UserAction<T> {
    type: UserActionType;
    payload: T;
}

export interface FlipCardUserAction extends Omit<UserAction<never>, "payload"> {
    type: UserActionType.flipCards;
}

export interface ClearCardsUserAction extends Omit<UserAction<never>, "payload"> {
    type: UserActionType.clearCards;
}

export interface VoteUserAction extends UserAction<Omit<Vote, "rotateAngle">> {
    type: UserActionType.vote;
    payload: Vote;
}

export const isVoteUserAction = (userAction: UserAction<unknown>): userAction is VoteUserAction => userAction.type === UserActionType.vote;