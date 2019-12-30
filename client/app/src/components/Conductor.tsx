import React, { FC, useState, useContext } from "react";
import { useSignalServer } from "./useSignalServer";
import { usePeers } from "./usePeers";
import { LocalVideo } from "./LocalVideo";
import { Nullable, CallState } from "../common/types";
import { RTCPeer } from "./RTCPeer";
import { CallController } from "./CallController";
import { WsContext } from "./websocketCtx";

const Conductor: FC = props => {
    const [localStream, setStream] = useState(null as Nullable<MediaStream>);
    const [callState, setCallState] = useState(null as Nullable<CallState>);

    const ws = useSignalServer("ws://localhost:5000");
    const [availablePeers, selfId] = usePeers(ws);

    return (
        <WsContext.Provider value={ws}>
            <div>
                <LocalVideo setStream={setStream} />
                <RTCPeer
                    selfId={selfId}
                    localStream={localStream}
                    callState={callState}
                />
                <CallController
                    selfId={selfId}
                    peers={availablePeers}
                    setCallState={setCallState}
                />
            </div>
        </WsContext.Provider>
    );
}

export { Conductor }