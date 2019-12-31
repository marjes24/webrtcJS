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
            <label htmlFor="peer-select">Select peer:</label>
            <select multiple id="peer-select">
                { peers.map(p => <PeerItem key={p.id} peer={p}/>)}
            </select>
        </div>
    );
};

export { PeerList };