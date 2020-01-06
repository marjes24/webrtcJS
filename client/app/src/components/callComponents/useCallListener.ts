import { useCallback } from "react";
import { useMessageListener } from "../useMessageLister";
import { CallState, CallStatus, Nullable } from "../../common/types";

type cb = (s: Nullable<CallState>) => void;

/**
 * Hook to listen for calls or for response to calls
 * @param ws 
 * @param setCallState 
 */
const useCallListener = (ws: Nullable<WebSocket>, setCallState: cb) => {

    // Define function to handle call messaging from signal server
    const callListener = useCallback(({ data }: MessageEvent) => {
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
                console.log("Received call ended message");
                setCallState(null);
            }
        } catch (err) {
            console.log("useCallListener: Error parsing message");
        }
    }, [setCallState]);

    useMessageListener(callListener);
};

export { useCallListener };