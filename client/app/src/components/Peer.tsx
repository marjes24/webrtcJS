import React, { FC } from "react";
import { Peer } from "../common/types";

interface Props { 
    peer: Peer, 
}

const PeerItem: FC<Props> = props => {
    return (
        // <li className="peer">
        //     {"Peer " + props.peer.id}
        // </li>
    <option className="peer">
        {"Peer " + props.peer.id}
    </option>
    );
};

export { PeerItem };