import { useState, useEffect, useRef } from 'react';
import { Nullable } from '../common/types';

/**
 * - Opens a websocket to signal server
 * @param url
 * @returns WebScoket
 */
const useSignalServer = (url: string) => {
    const [ws, setWS] = useState(null as Nullable<WebSocket>);
    const wsRef = useRef(null as Nullable<WebSocket>);

    useEffect(() => {
        const currWs = wsRef.current;

        if (url.trim() === '') return;

        // Close current connection if any
        if (currWs && currWs.readyState === currWs.OPEN) currWs.close();

        // Create websocket
        const newWS = new WebSocket(url);
        newWS.onopen = e => {
            console.log('Opened websocket to signal server: %s', url);
        };

        wsRef.current = newWS;
        setWS(newWS);
    }, [url, wsRef]);

    useEffect(() => {
        return () => {
            console.log('Closing websocket on cleanup');
            wsRef.current?.close();
        };
    }, [wsRef]);

    return ws;
};

export { useSignalServer };
