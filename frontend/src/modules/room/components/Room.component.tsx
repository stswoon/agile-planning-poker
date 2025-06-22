import { FC, memo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ClearCardsUserAction, FlipCardUserAction, UserActionType, VoteUserAction } from "@stswoon/shared";
import { useUserStore } from "../../common/stores/User.store.ts";
import { useWebSocket } from "../../common/hooks/UseWebSocket.hook.ts";
import { routes } from "../../common/constants/Routes.constants.ts";
import { useRoomStore } from "../stores/Room.store.ts";
import { RoomExtended } from "../models/RoomWithLoading.model.ts";
import { RoomLayout } from "./RoomLayout.component.tsx";
import { CardTable } from "./card-table/CardTable.component.tsx";
import { CardDeck } from "./card-deck/CardDeck.component.tsx";
import { ScoreBoard } from "./score-board/ScoreBoard.component.tsx";
import { testRooms } from "../../../tests/TestRoom.constants.ts";
import { notify } from "../../common/utils/Notification.util.tsx";

const Room: FC = memo(() => {
    const navigate = useNavigate();

    const { roomId } = useParams() as { roomId: string };

    const userId = useUserStore((state) => state.localUser.id);
    const userName = useUserStore((state) => state.localUser.name);

    const setRoom = useRoomStore((state) => state.setRoom);

    const { message, sendMessage, error, isConnecting } = useWebSocket(routes.wsRoomApi(roomId, userId, userName));

    useEffect(() => {
        if (__DEV_MODE__) {
            const fountTestRoom = testRooms.find((room) => room.id === roomId);
            if (fountTestRoom) {
                console.warn(`Used test room with id = ${fountTestRoom.id}`);
                setRoom({
                    ...fountTestRoom,
                    isError: false,
                    isLoading: false,
                });
                return;
            }
        }

        if (message) {
            const room: RoomExtended = JSON.parse(message);
            room.isError = !!error;
            room.isLoading = isConnecting;
            setRoom(room);
        }
    }, [isConnecting, error, message, roomId, setRoom]);

    useEffect(() => {
        if (error) {
            console.error("Error with WS: " + error);
            notify("Error with WS: " + error, "error");
        }
    }, [error]);

    useEffect(() => {
        if (isConnecting && message) {
            notify("Connecting to WS", "warning");
        }
    }, [isConnecting, message]);

    const handleThrowCard = useCallback(
        (cardValue: number | string) => {
            console.log("handleThrowCard:" + cardValue);
            const action: VoteUserAction = {
                type: UserActionType.vote,
                payload: { cardValue },
            };
            sendMessage(JSON.stringify(action));
        },
        [sendMessage],
    );

    const handleFlipCards = useCallback(() => {
        console.log("handleFlipCards");
        const action: FlipCardUserAction = { type: UserActionType.flipCards };
        sendMessage(JSON.stringify(action));
    }, [sendMessage]);

    const handleClearCards = useCallback(() => {
        console.log("handleClearCards");
        const action: ClearCardsUserAction = { type: UserActionType.clearCards };
        sendMessage(JSON.stringify(action));
    }, [sendMessage]);

    const handleChangeName = useCallback(() => {
        navigate(routes.navigation.homeWithReturnBack(roomId));
    }, [navigate, roomId]);

    const handleLeaveRoom = useCallback(() => {
        navigate(routes.navigation.home);
    }, [navigate]);

    return (
        <RoomLayout
            className="taRoom"
            cardTable={<CardTable />}
            cardDeck={<CardDeck onThrowCard={handleThrowCard} />}
            scoreBoard={
                <ScoreBoard
                    onChangeName={handleChangeName}
                    onLeaveRoom={handleLeaveRoom}
                    onFlipCards={handleFlipCards}
                    onClearCards={handleClearCards}
                    isLoading={isConnecting}
                />
            }
        />
    );
});

export { Room };
