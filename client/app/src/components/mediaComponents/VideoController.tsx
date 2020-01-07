import React, { FC, useState } from 'react';
import { Nullable, CallState } from '../../common/types';
import { RTCPeer } from './RTCPeer';
import { LocalVideo } from './LocalVideo';

interface Props {
    selfId: Nullable<number>;
    callState: Nullable<CallState>;
}

const VideoController: FC<Props> = ({ selfId, callState }) => {
    const [localStream, setStream] = useState(null as Nullable<MediaStream>);
    const [playLocal, setPlay] = useState(false);

    return (
        <>
            <div id="video-streams-wrapper">
                <LocalVideo play={playLocal} setStream={setStream} />
                <RTCPeer
                    selfId={selfId}
                    localStream={localStream}
                    callState={callState}
                />
            </div>
            <div id="video-btns">
                <button
                    id="play-local"
                    className={playLocal ? 'red' : 'green'}
                    onClick={e => setPlay(!playLocal)}
                >
                    {playLocal ? 'Stop Video' : 'Start Video'}
                </button>
            </div>
        </>
    );
};

export { VideoController };
