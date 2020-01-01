import { useEffect, useState } from "react";
import { Nullable, PeersObj } from "../common/types";

const PEERS_TOPIC = "AVAILABLE_PEERS";
const PEER_ID = "PEER_IDENTIFIER";


/**
 * Hook that uses websocket to listen for available peers and for
 * identifaction from signal server
 * @param ws - signal server websocket
 */
const usePeers = (ws: Nullable<WebSocket>) => {
    const [availablePeers, setPeers] = useState({} as PeersObj);
    const [selfId, setSelfId] = useState(null as Nullable<number>);

    const addPeerListener = (ws: WebSocket) => {
        ws.addEventListener("message", ({ data }) => {
            try {
                const mssg = JSON.parse(data);

                if (mssg.topic === PEERS_TOPIC) {
                    setPeers(mssg.peers);
                } else if(mssg.topic === PEER_ID) {
                    setSelfId(mssg.id);
                }
            } catch (err) {
                console.error("Error parsing websocket message");
            }
        });
    }

    useEffect(() => {
        if (!ws) return;

        const { readyState } = ws;

        if (readyState === WebSocket.OPEN)
            addPeerListener(ws);
        else if (readyState === WebSocket.CONNECTING)
            ws.addEventListener("open", evnt => addPeerListener(ws));
    }, [ws]);

    return [availablePeers, selfId] as const;
}

export { usePeers }