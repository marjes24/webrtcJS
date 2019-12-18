import { useState, useEffect } from "react";
import { Nullable, Peer } from "../common/types";

/**
 * - Opens andwebsocket to signal server
 * - Provides and updates avaible peers
 * @param url 
 */
const useSignalServer = (url: string) => {
    const [ws, setWS] = useState(null as Nullable<WebSocket>);

    useEffect(() => {
        if (url.trim() === "") return;

        // Close current connection if any
        if(ws && ws.readyState === ws.OPEN) ws.close();

        // Create websocket
        const newWS = new WebSocket(url);
        newWS.onopen = e => {
            console.log("Opened websocket to signal server: %s", url);
        }

        setWS(newWS);

    }, [url]);

    return ws;
}

export { useSignalServer }