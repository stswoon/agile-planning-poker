import { DtoRoom } from "shared";

export interface RoomExtended extends DtoRoom {
    isError: boolean;
    isLoading: boolean;
}
