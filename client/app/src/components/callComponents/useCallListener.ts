import { useEffect, useCallback } from "react";
import { CallState, CallStatus, Nullable } from "../../common/types";

type cb = (s: Nullable<CallState>) => void;

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
                    console.log(
                        "Received answer from %s, response: %s", 
                        mssg.peerId, 
                        mssg.response
                    );
                    if(mssg.response === "ANSWERED") {
                        setCallState({
                            status: CallStatus.INACALL,
                            targetPeer: mssg.peerId,
                            callId: mssg.callId,
                            initiator: true
                        });
                    } else {
                        setCallState(null);
                    }
                } else if(mssg.topic === "CALL_ENDED") {
                    setCallState(null);
                }
            } catch (err) {
                console.log("useCallListener: Error parsing message");
            }
        }

        const addCallListener = () => ws.addEventListener("message", callListener);
        const addCallListenerONOpen = () => addCallListener();

        console.log("useCallListener() - adding listener");
        const { readyState } = ws;
        if(readyState === WebSocket.OPEN)
            addCallListener();
        else if(readyState === WebSocket.CONNECTING)
            ws.addEventListener("open", addCallListenerONOpen);

        // Unsubscribe on cleanup
        return () => {
            console.log("useCallListener() - removed listener");
            ws?.removeEventListener("open", addCallListenerONOpen);
            ws?.removeEventListener("message", callListener);
        }

    }, [ws, setCallState]);
};

export { useCallListener };