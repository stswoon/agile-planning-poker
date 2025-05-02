import { RoomId, User, Vote } from "./Room.model";

export interface DtoRoom {
    id: RoomId;
    showCards: boolean;
    usersAndVotes: UserAndVote[];
}

export interface UserAndVote {
    user: User;
    vote?: Vote;
}

