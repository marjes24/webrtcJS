import { useEffect, useState } from "react";
import { Peer, Nullable, PeersObj } from "../common/types";

const PEERS_TOPIC = "AVAILABLE_PEERS"

const usePeers = (ws: Nullable<WebSocket>) => {
    const [availablePeers, setPeers] = useState({} as PeersObj);

    const addPeerListener = (ws: WebSocket) => {
        ws.addEventListener("message", ({ data }) => {
            try {
                const mssg = JSON.parse(data);

                if (mssg.topic === PEERS_TOPIC) {
                    setPeers(mssg.peers);
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

    return availablePeers;
}

export { usePeers }