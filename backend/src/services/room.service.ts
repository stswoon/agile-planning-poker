import { RoomId, UserId, UserAction, Vote } from "common";
import { WS } from "../utils/utils";
import { abstractCreateOrJoinRoom } from "./abstract-room.service";
import { roomRepository } from "../repositories/room.repository";

export function createOrJoinRoom(ws: WS, roomId: RoomId, userId: UserId, userName: string): void {
    abstractCreateOrJoinRoom(ws, roomId, userId, userName, executeUserAction);
}

function executeUserAction(roomId: RoomId, userId: UserId, userAction: UserAction<any>) {
    const userName = roomRepository.getRoom(userId).users[userId].name;
    const { type, payload } = userAction;

    if (type === "clearCards") {
        roomRepository.clearVotes(roomId);
        roomRepository.setShowCards(roomId, false);
    } else if (type === "flipCards") {
        const room = roomRepository.getRoom(roomId);
        roomRepository.setShowCards(roomId, !room.showCards);
    } else if (type === "vote") {
        const vote = payload as Vote;
        const rotateAngle = (Math.round(Math.random() * 10) - 5) * 2; //degrees
        roomRepository.vote(roomId, userId, { cardValue: vote.cardValue, rotateAngle });
        openCardIfAllVotes(roomId);
    } else {
        console.error(`Unknown user type cation=${type}, ${userName} (${userId}) in room ${roomId}`);
    }
}

const openCardIfAllVotes = (roomId: RoomId) => {
    const room = roomRepository.getRoom(roomId);
    const isAllVotes: boolean = Object.values(room.votes).reduce((acc, vote) => acc && vote.cardValue != null, true);
    if (isAllVotes) {
        console.info(`All users made vote in room (${roomId}) so open cards`);
        roomRepository.setShowCards(roomId, true);
    }
};
