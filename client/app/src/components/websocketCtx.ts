import { createContext } from "react";
import { Nullable } from "../common/types";

/**
 * - Allow all components to have access to the websocket connection
 */
const WsContext = createContext(null as Nullable<WebSocket>);

export { WsContext };