import { DtoRoom, UserAndVote } from "shared";

export const testRoom: DtoRoom = {
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

export const testBigRoom: DtoRoom = {
    id: "test-big-big-big-room",
    showCards: false,
    usersAndVotes: testRoom.usersAndVotes.reduce<DtoRoom["usersAndVotes"]>((acc, userAndVote) => {
        acc.push(getNewUserAndVote(userAndVote, "qqq_"));
        acc.push(getNewUserAndVote(userAndVote, "www_"));
        acc.push(getNewUserAndVote(userAndVote, "eee_"));
        return acc;
    }, []),
};

function getNewUserAndVote(userAndVote: UserAndVote, userNamePrefix: string): UserAndVote {
    return {
        user: {
            ...userAndVote.user,
            id: userNamePrefix + userAndVote.user.id,
            name: userNamePrefix + userAndVote.user.name,
        },
        vote: userAndVote.vote ? { ...userAndVote.vote } : undefined,
    };
}
