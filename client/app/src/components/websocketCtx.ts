import { createContext } from "react";
import { Nullable } from "../common/types";

const WsContext = createContext(null as Nullable<WebSocket>);

export { WsContext };