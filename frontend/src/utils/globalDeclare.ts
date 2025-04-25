import { JsMap } from "common";

declare global {
    interface Window {
        ws: JsMap<string, WebSocket>;
    }
}
