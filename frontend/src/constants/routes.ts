// const domain = __API_DOMAIN__ ?? "";

import { RoomId } from "common";

export const routes = {
    items: __API_DOMAIN__ + "/api/items",

    home: "/",
    room: (id: RoomId) => `room/${id}`,
};
