import React, { FC } from "react";
import { Peer } from "../../common/types";

interface Props { 
    peer: Peer, 
}

const PeerItem: FC<Props> = props => {
    return (
    <option className="peer" value={props.peer.id}>
        {"Peer " + props.peer.id}
    </option>
    );
};

export { PeerItem };