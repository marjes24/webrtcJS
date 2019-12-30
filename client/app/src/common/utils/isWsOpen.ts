
/**
 * True if websocket is open
 * @param ws 
 */
export const isWsOpen = (ws: WebSocket) => ws.readyState === WebSocket.OPEN;