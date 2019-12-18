import React, { FC, useState } from "react";
import { useSignalServer } from "./useSignalServer";
import { usePeers } from "./usePeers";
import { LocalVideo } from "./LocalVideo";
import { Nullable } from "../common/types";

const Conductor: FC = props => {
    const [localStream, setStream] = useState(null as Nullable<MediaStream>);

    const ws = useSignalServer("ws://localhost:5000");
    const availablePeers = usePeers(ws);

    return (
        <div>
            <LocalVideo setStream={setStream}/>
        </div>
    )
}

export { Conductor }