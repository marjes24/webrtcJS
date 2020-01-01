import { useEffect, useCallback } from "react";
import { CallState, CallStatus, Nullable } from "../../common/types";

type cb = (s: CallState) => void;

/**
 * Hook to listen for calls or for response to calls
 * @param ws 
 * @param setCallState 
 */
const useCallListener = (ws: Nullable<WebSocket>, setCallState: cb) => {

    useEffect(() => {
        if (!ws) return;

        // Websocket message event handler
        const callListener = ({ data }: MessageEvent) => {
            try {
                const mssg = JSON.parse(data);
                if (mssg.topic === "CALL_FROM_PEER") {
                    console.log("Receiving call from: %s", mssg.peerId);
                    setCallState({
                        status: CallStatus.BEINGCALLED,
                        targetPeer: mssg.peerId,
                        callId: mssg.callId,
                        initiator: false
                    });
                } else if (mssg.topic === "CALL_RESPONSE") {

                }
            } catch (err) {
                console.log("useCallListener: Error parsing message");
            }
        }

        const addCallListener = () => ws.addEventListener("message", callListener);
        const addCallListenerONOpen = () => addCallListener();

        console.log("Use call listener, adding listener");
        const { readyState } = ws;
        if(readyState === WebSocket.OPEN)
            addCallListener();
        else if(readyState === WebSocket.CONNECTING)
            ws.addEventListener("open", addCallListenerONOpen);

        // Unsubscribe on cleanup
        return () => {
            console.log("use call istener removed listener");
            ws?.removeEventListener("open", addCallListenerONOpen);
            ws?.removeEventListener("message", callListener);
        }

    }, [ws, setCallState]);
};

export { useCallListener };