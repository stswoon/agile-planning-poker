import { Room, RoomId, JsMap, User, UserId, Vote, utils } from "@stswoon/shared";

const ROOM_DB: JsMap<RoomId, Room> = {};

const getRoom = (id: RoomId): Room => {
    const room = ROOM_DB[id];
    if (!room) {
        throw new Error(`Illegal ROOM_DB state: can't find roomId ${id}`);
    }
    return utils.deepCopy(room);
};

const isRoomExist = (id: RoomId): boolean => !!ROOM_DB[id];

const getRoomIdsOlderThenDate = (filterDate: number): RoomId[] => {
    return Object.values(ROOM_DB)
        .filter((room: Room) => room.createdDate < filterDate)
        .map((room: Room) => room.id);
};

const _saveRoom = (room: Room): void => {
    // console.debug(`Room (${room.id}) was changed, new value: ${JSON.stringify(room)}`);
    ROOM_DB[room.id] = room;
};

const createRoom = (id: RoomId): void => {
    _saveRoom({
        id,
        createdDate: utils.now(),
        showCards: false,
        votes: {},
        users: {},
    });
};

const removeRoom = (id: RoomId): void => {
    console.debug(`Room (${id}) was deleted`);
    delete ROOM_DB[id];
};

const addUser = (roomId: RoomId, user: User): void => {
    const room = getRoom(roomId);
    room.users[user.id] = user;
    _saveRoom(room);
};

const setUserActivity = (roomId: RoomId, userId: UserId, active: boolean): void => {
    const room = getRoom(roomId);
    if (!room.users[userId]) {
        console.error(`User ${userId} not found in room ${roomId}`);
    } else {
        room.users[userId].active = active;
    }
    _saveRoom(room);
};

const removeUser = (roomId: RoomId, userId: UserId): void => {
    const room: Room = getRoom(roomId);
    delete room.users[userId];
    delete room.votes[userId];
    _saveRoom(room);
};

const vote = (roomId: RoomId, userId: UserId, vote: Vote): void => {
    const room: Room = getRoom(roomId);
    room.votes[userId] = vote;
    _saveRoom(room);
};

const setShowCards = (id: RoomId, showCards: boolean): void => {
    const room = getRoom(id);
    room.showCards = showCards;
    _saveRoom(room);
};

const clearVotes = (id: RoomId): void => {
    const room = getRoom(id);
    room.votes = {};
    _saveRoom(room);
};

export const roomRepository = {
    getRoom,
    isRoomExist,
    getRoomIdsOlderThenDate,
    createRoom,
    removeRoom,
    addUser,
    setUserActivity,
    removeUser,
    vote,
    setShowCards,
    clearVotes,
};
