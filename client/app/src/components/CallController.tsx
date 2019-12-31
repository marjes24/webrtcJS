import React, { FC, useState, useContext } from "react";
import { PeerList } from "./PeerList";
import { PeersObj, CallState, Nullable, CallStatus } from "../common/types";
import { isWsOpen } from "../common/utils/isWsOpen";
import { WsContext } from "./websocketCtx";
import { CallButtons } from "./callButtons";

interface Props { 
    selfId: Nullable<number>;
    peers: PeersObj;
    setCallState: (s: CallState) => void;
};

const CallController: FC<Props> = props => {
    const [selectedPeerId, selectPeer] = useState(null as Nullable<number>);

    const ws = useContext(WsContext);

    return (
        <div id="call-controller">
            <PeerList peers={props.peers} selectPeer={selectPeer}/>
            <CallButtons />
        </div>
    );
}

export { CallController };