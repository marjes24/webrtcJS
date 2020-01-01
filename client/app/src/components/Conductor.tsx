import React, { FC, useState } from "react";
import { useSignalServer } from "./useSignalServer";
import { usePeers } from "./usePeers";
import { LocalVideo } from "./mediaComponents/LocalVideo";
import { Nullable, CallState } from "../common/types";
import { RTCPeer } from "./mediaComponents/RTCPeer";
import { CallController } from "./callComponents/CallController";
import { WsContext } from "./websocketCtx";

const Conductor: FC = props => {
    const [localStream, setStream] = useState(null as Nullable<MediaStream>);
    const [callState, setCallState] = useState(null as Nullable<CallState>);

    const ws = useSignalServer("ws://localhost:5000");
    const [availablePeers, selfId] = usePeers(ws);

    return (
        <WsContext.Provider value={ws}>
            <div id="conductor">
                <div id="video-streams">
                    <LocalVideo setStream={setStream} />
                    <RTCPeer
                        selfId={selfId}
                        localStream={localStream}
                        callState={callState}
                    />
                </div>
                <hr></hr>
                <CallController
                    selfId={selfId}
                    peers={availablePeers}
                    callState={callState}
                    setCallState={setCallState}
                />
            </div>
        </WsContext.Provider>
    );
}

export { Conductor }