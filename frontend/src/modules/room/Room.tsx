import { memo } from "react";
import { useParams } from "react-router";

const Room = () => {
    const { roomId } = useParams();
    return <>room {roomId}</>;
};

export default memo(Room);
