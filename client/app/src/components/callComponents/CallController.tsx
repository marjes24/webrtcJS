import React, { FC, useState, useContext } from "react";
import { PeerList } from "./PeerList";
import { PeersObj, CallState, Nullable, CallStatus } from "../../common/types";
import { isWsOpen } from "../../common/utils/isWsOpen";
import { WsContext } from "../websocketCtx";
import { CallButtons } from "./callButtons";
import { useCallListener } from "./useCallListener";
import { StatusMessage } from "./StatusMessage";

interface Props { 
    selfId: Nullable<number>;
    peers: PeersObj;
    callState: Nullable<CallState>;
    setCallState: (s: Nullable<CallState>) => void;
};

const CallController: FC<Props> = props => {
    const [selectedPeerId, setPeer] = useState(null as Nullable<number>);

    // Start listening for calls and call responses
    const ws = useContext(WsContext);
    useCallListener(ws, props.setCallState);

    // Create handler functions for call button actions
    const callPeer = () => {
        if (selectedPeerId && ws && isWsOpen(ws)) {
            ws.send(JSON.stringify({
                topic: "CALL_PEER",
                destinationPeer: selectedPeerId
            }));

            props.setCallState({
                status: CallStatus.CALLING, 
                targetPeer: selectedPeerId,
                initiator: true
            });
        }
    };

    const respondToCall = (accept: boolean) => {
        if (ws && isWsOpen(ws)) {
            const response = accept ? "ANSWER_CALL" : "IGNORE_CALL";
            ws.send(JSON.stringify({
                topic: "CALL_RESPONSE",
                response,
                callId: props.callState?.callId
            }));

            props.setCallState({
                status: accept ? CallStatus.INACALL : CallStatus.NONE,
                targetPeer: props.callState!.targetPeer,
                initiator: false
            })
        }
    }

    const endCall = () => {
        if(ws && isWsOpen(ws)) {
            ws.send(JSON.stringify({
                topic: "END_CALL", 
                peerId: props.selfId
            }));

            props.setCallState(null);
        }
    }

    const selectPeer = (peerId: Nullable<number>) => {
        // Only allow peer selection when not in one of the call/calling/called states
        const status = props.callState?.status ?? CallStatus.NONE;
        if(status === CallStatus.NONE) 
            setPeer(peerId);
    }

    return (
        <div id="call-controller">
            <PeerList 
                selfId={props.selfId}
                peers={props.peers} 
                selectPeer={selectPeer}
                selectedId={selectedPeerId}
            />
            <div id="status-wrapper">
                <StatusMessage
                    callState={props.callState}
                />
                <CallButtons 
                    callState={props.callState}
                    callPeer={callPeer}
                    respondToCall={respondToCall}
                    endCall={endCall}
                />

            </div>
        </div>
    );
}

export { CallController };