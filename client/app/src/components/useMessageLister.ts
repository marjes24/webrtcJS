import { useEffect, useContext } from 'react';
import { WsContext } from './websocketCtx';

type cb = (mssgEvnt: MessageEvent) => void;

/**
 * Hook that will add a function to handle messages to the current websocket context
 * @param messageHandler - Message handling function
 */
const useMessageListener = (messageHandler: cb) => {
    const ws = useContext(WsContext);

    useEffect(() => {
        if (!ws) return;

        const addMessageHandler = () =>
            ws.addEventListener('message', messageHandler);
        const onOpenHandler = () => addMessageHandler();
        const addOnOpen = () => ws.addEventListener('open', onOpenHandler);

        const { readyState } = ws;

        if (readyState === WebSocket.OPEN) {
            addMessageHandler();
        } else if (readyState === WebSocket.CONNECTING) {
            addOnOpen();
        }

        // Unsub from message handlers
        return () => {
            ws?.removeEventListener('open', onOpenHandler);
            ws?.removeEventListener('message', messageHandler);
        };
    }, [messageHandler, ws]);
};

export { useMessageListener };
