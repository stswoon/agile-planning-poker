import { useEffect, useRef, useState } from "react";
import { WsService } from "../services/Ws.service.ts";

export function useWebSocket(url: string) {
    const wsServiceRef = useRef<WsService>(null);
    const [isError, setIsError] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [message, setMessage] = useState<string | undefined>();

    useEffect(() => {
        console.log("Room connecting");
        const wsService = new WsService(
            url,
            (message) => {
                setMessage(message);
            },
            (error) => {
                setIsError(!!error);
            },
            (loading) => {
                setIsConnecting(loading);
            },
        );
        wsService.attachWsToRoom();
        wsServiceRef.current = wsService;

        return () => {
            console.log("Room disconnect");
            wsService.finalize();
        };
    }, [url]);

    const sendMessage = (message: string) => {
        if (wsServiceRef.current) {
            wsServiceRef.current.send(message);
        } else {
            console.warn("WebSocket is not open");
        }
    };

    return { message, sendMessage, isError, isConnecting };
}
