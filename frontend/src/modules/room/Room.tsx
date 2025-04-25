import { memo } from "react";
import { useParams } from "react-router";
import { useUserStore } from "../../stores/user.store.ts";
import { useWebSocket } from "../../hooks/useWebSocket.hook.ts";
import { routes } from "../../constants/routes.constants.ts";

const Room = () => {
    const { roomId } = useParams() as { roomId: string };

    const userId = useUserStore((state) => state.localUser.id);
    const userName = useUserStore((state) => state.localUser.name);

    const { message, sendMessage, isError, isConnecting } = useWebSocket(routes.wsRoomApi(roomId, userId, userName));
    console.log(isConnecting, isError);

    return (
        <>
            <div>room {roomId}</div>
            <div>isConnecting: {isConnecting + '2'}</div>
            <div>isError: {isError + '1'}</div>
            <div>last message:</div>
            <div>{message}</div>
            <button onClick={() => sendMessage("test")}>Send</button>
        </>
    );
};

export default memo(Room);
