import { DtoRoom } from "@stswoon/shared";

export interface RoomExtended extends DtoRoom {
    isError: boolean;
    isLoading: boolean;
}
