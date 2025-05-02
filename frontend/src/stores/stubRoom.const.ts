import { DtoRoom } from "common";

export const stubRoom: DtoRoom = {
    id: "test-room",
    showCards: false,
    usersAndVotes: [
        {
            user: {
                name: "Shiny Dexter Jettster3",
                id: "1",
                active: true,
            },
            vote: {
                rotateAngle: 10,
                cardValue: "?",
            },
        },
        {
            user: {
                name: "Ivan Ivanov",
                id: "2",
                active: false,
            },
            vote: {
                rotateAngle: 0,
                cardValue: 0,
            },
        },
        {
            user: {
                name: "Petr Petrovich",
                id: "3",
                active: false,
            },
            vote: {
                rotateAngle: -10,
                cardValue: 5,
            },
        },
        {
            user: {
                name: "NoName",
                id: "4",
                active: true,
            },
            vote: undefined,
        },
        {
            user: {
                name: "Very looooooooong nnnnnaaaaaaaaaaaaaaaaaaaaammmmmeeeeeeeee name name name",
                id: "5",
                active: true,
            },
        },
    ],
};

export const stubBigRoom: DtoRoom = {
    id: "test-big-big-big-room",
    showCards: false,
    usersAndVotes: stubRoom.usersAndVotes.reduce<DtoRoom["usersAndVotes"]>((acc, userAndVote) => {
        let newUserId = userAndVote.user.id + "qq_";
        acc.push({
            user: { ...userAndVote.user, id: newUserId },
            vote: userAndVote.vote ? { ...userAndVote.vote } : undefined,
        });
        newUserId = userAndVote.user.id + "ww_";
        acc.push({
            user: { ...userAndVote.user, id: newUserId },
            vote: userAndVote.vote ? { ...userAndVote.vote } : undefined,
        });
        newUserId = userAndVote.user.id + "ee_";
        acc.push({
            user: { ...userAndVote.user, id: newUserId },
            vote: userAndVote.vote ? { ...userAndVote.vote } : undefined,
        });
        return acc;
    }, []),
};
