import React, { FC } from "react";
import { Peer, Nullable, CallState} from "../common/types";

interface Props {
    selfId: Nullable<number>;
    localStream: Nullable<MediaStream>;
    callState: Nullable<CallState>;
}

const RTCPeer: FC<Props> = props => {

    return <div id="rtc-peer"></div>;
}

export { RTCPeer };