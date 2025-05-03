import { RoomId, UserId } from "@stswoon/shared";

export const routes = {
    navigation: {
        home: "/",
        room: (id: RoomId) => `/room/${id}`,
        homeWithReturnBack(roomId: RoomId) {
            return `${this.home}?${this.redirectRoomIdSearchParamName}=${roomId}`;
        },
        redirectRoomIdSearchParamName: "redirectRoomId",
    },

    wsRoomApi: (roomId: RoomId, userId: UserId, userName: string) => {
        const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
        const wsHost = __API_DOMAIN__
            ? __API_DOMAIN__.replace("http://", "").replace("https://", "")
            : window.location.host;
        return `${wsProtocol}://${wsHost}/api/room?roomId=${roomId}&userId=${userId}&userName=${userName}`;
    },

    donate: "https://yoomoney.ru/to/41001998657825",
};
