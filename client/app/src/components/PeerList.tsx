import React, { FC, useState } from "react";
import { PeersObj, Nullable, Peer } from "../common/types";
import { PeerItem } from "./Peer";

interface Props { 
    peers: PeersObj;
    selectPeer: (peerId: number) => void;
}

const PeerList: FC<Props> = props => {
    const peers = Object.values(props.peers);

    return (
        <div id="peer-list">
            { peers.map(p => <PeerItem key={p.id} peer={p}/>)}
        </div>
    );
};

export { PeerList };