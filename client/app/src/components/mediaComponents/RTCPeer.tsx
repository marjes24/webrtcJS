import React, { FC } from "react";
import { Nullable, CallState } from "../../common/types";
import { VideoPlayer } from "./VideoPlayer";

interface Props {
    selfId: Nullable<number>;
    localStream: Nullable<MediaStream>;
    callState: Nullable<CallState>;
}

const RTCPeer: FC<Props> = props => {

    return (
        <div id="rtc-peer" className="video-wrapper">
            <VideoPlayer play={false} stream={null} />
        </div>
    );
}

export { RTCPeer };