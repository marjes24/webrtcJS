import React, { FC } from "react";
import { Nullable, CallState } from "../../common/types";
import { VideoPlayer } from "./VideoPlayer";
import { useWebRTC } from "./useWebRTC"

interface Props {
    selfId: Nullable<number>;
    localStream: Nullable<MediaStream>;
    callState: Nullable<CallState>;
}

const RTCPeer: FC<Props> = props => {

    const remoteStream = useWebRTC(props.callState, props.localStream);
    
    return (
        <div id="rtc-peer" className="video-wrapper">
            <VideoPlayer play={remoteStream ? true : false} stream={remoteStream} />
        </div>
    );
}

export { RTCPeer };