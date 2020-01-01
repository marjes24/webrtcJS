import React, { FC, useState, useContext } from "react";
import { PeerList } from "./PeerList";
import { PeersObj, CallState, Nullable, CallStatus } from "../../common/types";
import { WsContext } from "../websocketCtx";
import { CallButtons } from "./callButtons";
import { isWsOpen } from "../../common/utils/isWsOpen";
import { useCallListener } from "./useCallListener";

interface Props { 
    selfId: Nullable<number>;
    peers: PeersObj;
    callState: Nullable<CallState>;
    setCallState: (s: CallState) => void;
};

const CallController: FC<Props> = props => {
    const [selectedPeerId, selectPeer] = useState(null as Nullable<number>);

    const ws = useContext(WsContext);

    // Start listening for calls and call responses
    useCallListener(ws, props.setCallState);

    const callPeer = () => {
        if(selectedPeerId && ws &&isWsOpen(ws)) {
            ws.send(JSON.stringify({
                topic: "CALL_PEER",
                destinationPeer: selectedPeerId
            }));
        }
    };

    return (
        <div id="call-controller">
            <PeerList 
                selfId={props.selfId}
                peers={props.peers} 
                selectPeer={selectPeer}
                selectedId={selectedPeerId}
            />
            <CallButtons 
                callPeer={callPeer}
            />
        </div>
    );
}

export { CallController };