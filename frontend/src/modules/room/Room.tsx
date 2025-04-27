import { memo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useUserStore } from "../../stores/user.store.ts";
import { useWebSocket } from "../../hooks/useWebSocket.hook.ts";
import { routes } from "../../constants/routes.constants.ts";
import AppLayout from "./AppLayout.tsx";
import { RoomExtended, useRoomStore } from "../../stores/room.store.ts";
import CardDeck from "./CardDeck.tsx";
import GameMenu from "./ScoreBoard.tsx";
import CardTable from "./CardTable.tsx";
import { ClearCardsUserAction, FlipCardUserAction, VoteUserAction } from "common";

const Room = () => {
    const navigate = useNavigate();
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
        (cardValue: number | string) => {
            console.log("handleThrowCard:" + cardValue);
            const action: VoteUserAction = {
                type: "vote",
                payload: { userId, cardValue },
            };
            sendMessage(JSON.stringify(action));
        },
        [sendMessage, userId],
    );

    const handleFlipCards = useCallback(() => {
        console.log("handleFlipCards");
        const action: FlipCardUserAction = { type: "flipCards" };
        sendMessage(JSON.stringify(action));
    }, [sendMessage]);

    const handleClearCards = useCallback(() => {
        console.log("handleClearCards");
        const action: ClearCardsUserAction = { type: "clearCards" };
        sendMessage(JSON.stringify(action));
    }, [sendMessage]);

    const handleChangeName = useCallback(() => {
        navigate(routes.homeWithReturnBuck(roomId));
    }, [navigate, roomId]);

    const handleLeaveRoom = useCallback(() => {
        navigate(routes.home);
    }, [navigate]);

    return (
        <AppLayout
            cardTable={<CardTable />}
            cardDeck={<CardDeck onThrowCard={handleThrowCard} />}
            scoreBoard={
                <GameMenu
                    onChangeName={handleChangeName}
                    onLeaveRoom={handleLeaveRoom}
                    onFlipCards={handleFlipCards}
                    onClearCards={handleClearCards}
                />
            }
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
