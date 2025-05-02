// const domain = __API_DOMAIN__ ?? "";

import { RoomId, UserId } from "common";

export const routes = {
    //navigate to react routing
    home: "/",
    room: (id: RoomId) => `/room/${id}`,
    homeWithReturnBuck(roomId: RoomId) {
        return `${this.home}?redirectRoomId=${roomId}`;
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
