import React, { FC } from 'react';
import { PeersObj, Nullable } from '../../common/types';
import { PeerItem } from './Peer';
import { MuiSelect } from '../styleComponents/MuiSelect';

interface Props {
    peers: PeersObj;
    selfId: Nullable<number>;
    selectedId: Nullable<number>;
    selectPeer: (peerId: number) => void;
}

const PeerList: FC<Props> = props => {
    const peers = Object.values(props.peers).filter(p => p.id !== props.selfId);

    const options = peers.map(p => ({
        display: <PeerItem peer={p} />,
        value: p.id
    }));

    return (
        <div id="peer-list">
            <MuiSelect
                label="Peer"
                options={options}
                value={props.selectedId ?? ''}
                onChange={e => props.selectPeer(Number(e.target.value))}
                disabled={options.length === 0}
            />
        </div>
    );
};

export { PeerList };
