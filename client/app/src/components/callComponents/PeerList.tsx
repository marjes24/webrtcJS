import React, { FC } from 'react';
import { PeersObj, Nullable, CallState, CallStatus } from '../../common/types';
import { PeerItem } from './Peer';
import { MuiSelect } from '../styleComponents/MuiSelect';

interface Props {
    peers: PeersObj;
    selfId: Nullable<number>;
    selectedId: Nullable<number>;
    callState: Nullable<CallState>;
    selectPeer: (peerId: number) => void;
}

const PeerList: FC<Props> = props => {
    const peers = Object.values(props.peers).filter(p => p.id !== props.selfId);

    const options = peers.map(p => ({
        display: <PeerItem peer={p} />,
        value: p.id
    }));

    // If calling or in a call, disable select
    let disabled = false;
    if (props.callState == undefined && options.length === 0) {
        disabled = true;
    } else if (props.callState == undefined && options.length !== 0) {
        disabled = false;
    } else if (
        props.callState != undefined &&
        props.callState.status != CallStatus.NONE
    ) {
        disabled = true;
    }

    return (
        <div id="peer-list">
            <MuiSelect
                label="Peer"
                options={options}
                value={props.selectedId ?? ''}
                onChange={e => props.selectPeer(Number(e.target.value))}
                disabled={disabled}
            />
        </div>
    );
};

export { PeerList };
