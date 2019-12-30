import EventEmitter from "events";
import ws from "ws";
import { Json, PeerMessage, CallEvent, CallResponseEvent } from "./types";

declare interface Peer {
    on(event: "CALL_PEER", cb: (m: CallEvent) => void): this;
    on(event: "CALL_RESPONSE", cb: (m: CallResponseEvent) => void): this;
    on(event: "END_CALL", cb: () => void): this;
    on(event: "RTC_MESSAGE", cb: (m: any) => void): this;
    on(event: "CLOSE", cb: () => void): this;
}

export enum PeerStatus {
    AVAILABLE,
    BUSY,
    INACALL
}

class Peer extends EventEmitter {
    private id: number;
    private ws: ws;
    private status: PeerStatus;

    constructor(ws: ws, id: number) {
        super();

        this.id = id;
        this.ws = ws;
        this.status = PeerStatus.AVAILABLE;

        this.addWsListeners(this.ws);

        // Let peer know of its identification
        this.sendMessage({
            topic: "PEER_IDENTIFIER",
            id: this.id
        });

        console.log("Created peer with id: %s", this.id);
    }

    private addWsListeners(ws: ws) {
        this.ws.addEventListener("message", ({ data }) => {
            try {
                const mssg = JSON.parse(data);
                const { topic } = mssg as PeerMessage;

                this.emit(topic, mssg);
            } catch (err) {
                console.error(
                    "Error parsing incoming message from peer: %s",
                    this.id
                );
            }
        });

        this.ws.addEventListener("close", () => {
            this.emit("END_CALL");
            this.emit("CLOSE");
        });
    }


    public sendMessage(mssg: Json) {
        if (this.ws.readyState === ws.OPEN) {
            this.ws.send(JSON.stringify(mssg));
        }
    }

    public serialize() {
        return {
            id: this.id,
            status: this.status
        };
    }

    get peerId() { return this.id; }
    set peerId(id: number) { this.id = id; }

    set peerStatus(s: PeerStatus) { this.status = s; }
    get peerStatus() { return this.status; }
}

export default Peer;