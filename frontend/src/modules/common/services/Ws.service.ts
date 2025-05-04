import { getRandomShortId } from "../utils/Random.util.ts";

export type OnMessageCallback = (message: string) => void;
export type OnErrorCallback = (error?: string) => void;
export type OnLoadingCallback = (loading: boolean) => void;

const MAX_TRIES = 5;
const CONNECTION_TIMEOUT = 30 * 1000;
const HEARTBEAT_PERIOD = 10 * 1000;
const NORMAL_WS_CLOSE_CODE = 1000;

// declare global {
//     interface Window {
//         ws: JsMap<string, WebSocket>;
//     }
// }

export class WsService {
    private readonly __id = getRandomShortId();

    private readonly url: string;
    private readonly onMessage: OnMessageCallback;
    private readonly onError: OnErrorCallback;
    private readonly onLoading: OnLoadingCallback;

    private ws?: WebSocket;

    private wsPingIntervalId?: ReturnType<typeof setTimeout>;
    private closedNormally: boolean = false;

    private wsHeartbeatTimeoutId?: ReturnType<typeof setTimeout>;
    private wsTry: number = 0;

    constructor(url: string, onMessage: OnMessageCallback, onError: OnErrorCallback, onLoading: OnLoadingCallback) {
        console.debug(`RoomService.__id=${this.__id}`);

        this.url = url;
        this.onMessage = onMessage;
        this.onError = onError;
        this.onLoading = onLoading;
    }

    public finalize(): void {
        this.closedNormally = true;
        clearTimeout(this.wsPingIntervalId);
        this.ws?.close(NORMAL_WS_CLOSE_CODE, "client leave room");
    }

    public send(message: string) {
        if (!this.ws) {
            console.error("WS is empty, please setup it first");
            return;
        }
        try {
            this.ws.send(message);
        } catch (e) {
            this.onError((e as { message: string }).message);
        }
    }

    public attachWsToRoom() {
        this.onError(undefined);
        this.onLoading(true);
        this.ws = new WebSocket(this.url);
        //for debug
        //window.ws = window.ws || {};
        //window.ws[this.__id] = this.ws;

        const wsConnectionTimeoutId = setTimeout(() => {
            console.error("Failed to connect WS after 30 sec");
            this.ws?.close(5000, "Client 30 sec timeout");
        }, CONNECTION_TIMEOUT);

        this.ws.onopen = () => {
            console.info("WS connected");
            this.wsTry = 0;
            clearTimeout(wsConnectionTimeoutId);
            clearTimeout(this.wsPingIntervalId);

            this.wsPingIntervalId = setInterval(() => {
                console.log(`ping, RoomService.__id=${this.__id}`);
                this.ws?.send("H");
            }, HEARTBEAT_PERIOD);

            this.onLoading(false);
        };

        this.ws.onclose = (event: CloseEvent) => {
            clearTimeout(wsConnectionTimeoutId);
            if (event.wasClean) {
                console.info("WS closed normally");
            } else {
                if (this.closedNormally) {
                    console.info("skip error on normal close");
                    return;
                }
                console.error("WS interrupted");
                if (this.wsTry < MAX_TRIES) {
                    console.log(`Try connect again: wsTry=${this.wsTry}/${MAX_TRIES}`);
                    this.wsTry++;
                    setTimeout(() => this.attachWsToRoom(), this.wsTry * 1000);
                } else {
                    console.error("SYSTEM ERROR: Can't connect to server, achieved max count of attempts");
                    // alert("SYSTEM ERROR: Can't connect to server");
                    this.onError("SYSTEM ERROR: Can't connect to server");
                    this.onLoading(false);
                }
            }
            clearTimeout(this.wsHeartbeatTimeoutId);
            console.debug(`WS error code ${event.code} and reason ${event.reason}`);
        };

        this.ws.onerror = (error: unknown) => {
            clearTimeout(this.wsHeartbeatTimeoutId);
            console.debug("WS error:" + (error as { message: string }).message);
            // this.onError("SYSTEM ERROR: Can't connect to server");
        };

        this.ws.onmessage = (event: MessageEvent<string>) => {
            console.debug("WS data", event.data);
            if (event.data === "H") {
                console.debug("heart-bit");
            } else {
                this.onMessage(event.data);
            }
        };
    }
}
