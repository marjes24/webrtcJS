import React, { FC, useState } from 'react';
import { useSignalServer } from './useSignalServer';
import { usePeers } from './usePeers';
import { Nullable, CallState } from '../common/types';
import { CallController } from './callComponents/CallController';
import { WsContext } from './websocketCtx';
import { VideoController } from './mediaComponents/VideoController';

const Conductor: FC = props => {
    const [callState, setCallState] = useState(null as Nullable<CallState>);

    //Connect to signal server
    const ws = useSignalServer('ws://localhost:5000');

    // Start listening for available peers
    const [availablePeers, selfId] = usePeers(ws);

    return (
        <WsContext.Provider value={ws}>
            <div id="conductor">
                <VideoController selfId={selfId} callState={callState} />
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
};

export { Conductor };
