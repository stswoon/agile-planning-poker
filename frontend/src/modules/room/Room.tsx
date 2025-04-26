import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useUserStore } from "../../stores/user.store.ts";
import { useWebSocket } from "../../hooks/useWebSocket.hook.ts";
import { routes } from "../../constants/routes.constants.ts";
import AppLayout from "./AppLayout.tsx";
import { RoomExtended, useRoomStore } from "../../stores/room.store.ts";
import CardDeck from "./CardDeck.tsx";
import GameMenu from "./ScoreBoard.tsx";
import CardTable from "./CardTable.tsx";
import { VoteUserAction } from "common";

const Room = () => {
    const { roomId } = useParams() as { roomId: string };

    const userId = useUserStore((state) => state.localUser.id);
    const userName = useUserStore((state) => state.localUser.name);

    const setRoom = useRoomStore((state) => state.setRoom);

    const { message, sendMessage, isError, isConnecting } = useWebSocket(routes.wsRoomApi(roomId, userId, userName));

    useEffect(() => {
        if (message) {
            const room: RoomExtended = JSON.parse(message);
            room.isError = isError;
            room.isLoading = isConnecting;
            setRoom(room);
        }
    }, [isConnecting, isError, message, setRoom]);

    const handleThrowCard = useCallback(
        (cardValue: string) => {
            console.log(cardValue);
            const action: VoteUserAction = {
                type: "vote",
                payload: { userId, cardValue },
            };
            sendMessage(JSON.stringify(action));
        },
        [sendMessage, userId],
    );

    return (
        <AppLayout
            cardTable={<CardTable />}
            cardDeck={<CardDeck onThrowCard={handleThrowCard} />}
            gameMenu={<GameMenu />}
        />
    );

    // console.log(isConnecting, isError);
    // return (
    //     <>
    //         <div>room {roomId}</div>
    //         <div>isConnecting: {isConnecting + '2'}</div>
    //         <div>isError: {isError + '1'}</div>
    //         <div>last message:</div>
    //         <div>{message}</div>
    //         <button onClick={() => sendMessage("test")}>Send</button>
    //     </>
    // );
};

export default memo(Room);
