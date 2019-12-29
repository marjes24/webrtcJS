import ws from "ws";
import PeerManager from "./peerManager";

// Set up websocket server
const PORT = Number(process.env.PORT) ?? 5000;
const wss = new ws.Server({
    port: PORT
});

const pMgr = new PeerManager();

// Set server listeners
wss.on("listening", function() {
    console.log("Websocket server listening on port: %s", PORT);
});

wss.on("connection", (ws, req) => {
    console.log("Websocket client connection from %s", req.url);
    pMgr.createPeer(ws);
});