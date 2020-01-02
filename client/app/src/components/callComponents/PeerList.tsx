import React, { FC } from "react";
import { PeersObj, Nullable } from "../../common/types";
import { PeerItem } from "./Peer";

interface Props {
    peers: PeersObj;
    selfId: Nullable<number>;
    selectedId: Nullable<number>;
    selectPeer: (peerId: number) => void;
}

const PeerList: FC<Props> = props => {
    const peers = Object
        .values(props.peers)
        .filter(p => p.id !== props.selfId);

    return (
        <div id="peer-list">
            <label htmlFor="peer-select">Available Peers:</label>
            <select
                id="peer-select"
                multiple
                value={[String(props.selectedId ?? "")]}
                onChange={e => props.selectPeer(Number(e.target.value))}
            >
                {peers.map(p => <PeerItem key={p.id} peer={p} />)}
            </select>
        </div>
    );
};

export { PeerList };