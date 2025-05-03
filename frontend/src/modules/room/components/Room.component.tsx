import { FC, memo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ClearCardsUserAction, FlipCardUserAction, UserActionType, VoteUserAction } from "shared";
import { useUserStore } from "../../home/User.store.ts";
import { useWebSocket } from "../../common/hooks/UseWebSocket.hook.ts";
import { routes } from "../../common/constants/Routes.constants.ts";
import { useRoomStore } from "../stores/Room.store.ts";
import { testBigRoom, testRoom } from "../constants/TestRoom.const.ts";
import { RoomExtended } from "../models/RoomWithLoading.model.ts";
import { RoomLayout } from "./RoomLayout.component.tsx";
import { CardTable } from "./card-table/CardTable.component.tsx";
import { CardDeck } from "./card-deck/CardDeck.component.tsx";
import { ScoreBoard } from "./score-board/ScoreBoard.component.tsx";

const Room: FC = memo(() => {
    const navigate = useNavigate();

    const { roomId } = useParams() as { roomId: string };

    const userId = useUserStore((state) => state.localUser.id);
    const userName = useUserStore((state) => state.localUser.name);

    const setRoom = useRoomStore((state) => state.setRoom); //TODO: move to store

    const { message, sendMessage, isError, isConnecting } = useWebSocket(routes.wsRoomApi(roomId, userId, userName));

    useEffect(() => {
        if (__DEV_MODE__) {
            if (roomId === testRoom.id) {
                setRoom({
                    ...testRoom,
                    isError: false,
                    isLoading: false,
                });
                return;
            } else if (roomId === testBigRoom.id) {
                setRoom({
                    ...testBigRoom,
                    isError: false,
                    isLoading: false,
                });
                return;
            }
        }

        if (message) {
            const room: RoomExtended = JSON.parse(message);
            room.isError = isError; //TODO: test
            room.isLoading = isConnecting; //TODO: test
            setRoom(room);
        }
    }, [isConnecting, isError, message, roomId, setRoom]);

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
                />
            }
        />
    );
});

export { Room };

//TODO: noyt screens
//TODO: cookie
//TODO your name
//TODO: big js warning size,
//TODO: lazy routing
//TODO: move user store to common?
