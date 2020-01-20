import React, { FC, useState, useContext } from 'react';
import { PeersObj, CallState, Nullable, CallStatus } from '../../common/types';
import { isWsOpen } from '../../common/utils/isWsOpen';
import { WsContext } from '../websocketCtx';
import { useCallListener } from './useCallListener';
import { usePeerSelector } from './usePeerSelector';
import { CallCard } from './CallCard';

interface Props {
    selfId: Nullable<number>;
    peers: PeersObj;
    callState: Nullable<CallState>;
    setCallState: (s: Nullable<CallState>) => void;
}

const CallController: FC<Props> = props => {
    // Start listening for calls and call responses
    const ws = useContext(WsContext);
    useCallListener(ws, props.setCallState);

    // Set up peer selection
    const [selectedPeerId, selectPeer] = usePeerSelector(props.callState);

    // Create handler functions for call button actions
    const callPeer = () => {
        if (selectedPeerId && ws && isWsOpen(ws)) {
            ws.send(
                JSON.stringify({
                    topic: 'CALL_PEER',
                    destinationPeer: selectedPeerId
                })
            );

            props.setCallState({
                status: CallStatus.CALLING,
                targetPeer: selectedPeerId,
                initiator: true
            });
        }
    };

    const respondToCall = (accept: boolean) => {
        if (ws && isWsOpen(ws)) {
            const response = accept ? 'ANSWER_CALL' : 'IGNORE_CALL';
            ws.send(
                JSON.stringify({
                    topic: 'CALL_RESPONSE',
                    response,
                    callId: props.callState?.callId
                })
            );

            props.setCallState({
                status: accept ? CallStatus.INACALL : CallStatus.NONE,
                targetPeer: props.callState!.targetPeer,
                initiator: false
            });
        }
    };

    const endCall = () => {
        if (ws && isWsOpen(ws)) {
            ws.send(
                JSON.stringify({
                    topic: 'END_CALL',
                    peerId: props.selfId
                })
            );

            props.setCallState(null);
        }
    };

    return (
        <div id="call-controller">
            <div id="status-wrapper">
                <CallCard
                    callPeer={callPeer}
                    respondToCall={respondToCall}
                    endCall={endCall}
                    callState={props.callState}
                    selfId={props.selfId}
                    peers={props.peers}
                    selectPeer={selectPeer}
                    selectedId={selectedPeerId}
                />
            </div>
        </div>
    );
};

export { CallController };
