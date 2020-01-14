import React, { FC } from 'react';
import { Peer } from '../../common/types';

interface Props {
    peer: Peer;
}

const PeerItem: FC<Props> = props => {
    return <div>{'Peer ' + props.peer.id}</div>;
};

export { PeerItem };
