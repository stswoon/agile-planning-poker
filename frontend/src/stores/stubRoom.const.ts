import { Room } from "common";

export const stubRoom: Room = {
    createdDate: new Date().getTime(),
    id: "test-room",
    showCards: false,
    users: {
        "1": {
            name: "Shiny Dexter Jettster3",
            id: "1",
            active: true,
        },
        "2": {
            name: "Ivan Ivanov",
            id: "2",
            active: false,
        },
        "3": {
            name: "Petr Petrovich",
            id: "3",
            active: false,
        },
        "4": {
            name: "NoName",
            id: "4",
            active: true,
        },
        "5": {
            name: "Very looooooooong nnnnnaaaaaaaaaaaaaaaaaaaaammmmmeeeeeeeee name name name",
            id: "5",
            active: true,
        },
    },
    votes: {
        "1": {
            userId: "1",
            rotateAngle: 10,
            cardValue: "?",
        },
        "2": {
            userId: "2",
            rotateAngle: 0,
            cardValue: 0,
        },
        "3": {
            userId: "3",
            rotateAngle: -10,
            cardValue: 5,
        },
        "4": {
            userId: "1",
            rotateAngle: 10,
            cardValue: undefined,
        },
    },
};

export const stubBigRoom: Room = {
    createdDate: new Date().getTime(),
    id: "test-big-big-big-room",
    showCards: false,
    users: Object.keys(stubRoom.users).reduce<Room["users"]>((acc, userId) => {
        let newUserId = userId + "q";
        acc[newUserId] = { ...stubRoom.users[userId], id: newUserId };
        newUserId = userId + "w";
        acc[newUserId] = { ...stubRoom.users[userId], id: newUserId };
        newUserId = userId + "e";
        acc[newUserId] = { ...stubRoom.users[userId], id: newUserId };
        return acc;
    }, {}),
    votes: Object.keys(stubRoom.votes).reduce<Room["votes"]>((acc, userId) => {
        let newUserId = userId + "q";
        acc[newUserId] = { ...stubRoom.votes[userId], userId: newUserId };
        newUserId = userId + "w";
        acc[newUserId] = { ...stubRoom.votes[userId], userId: newUserId };
        newUserId = userId + "e";
        acc[newUserId] = { ...stubRoom.votes[userId], userId: newUserId };
        return acc;
    }, {}),
};
