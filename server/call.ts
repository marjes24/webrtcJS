import Peer from "./peer";
import EventEmitter from "events";

declare interface Call {
    on(event: "CALL_ENDED", cb: () => void): this;
}

class Call extends EventEmitter { 
    private id: number;
    private origin: Peer;
    private destination: Peer;

    constructor(origin: Peer, destination: Peer, id: number) { 
        super();

        this.origin = origin;
        this.destination = destination;
        this.id = id;

        this.setOriginListeners();
        this.setDestinationListeners();
        this.startCallMessage();

        console.log(
            "Created call: %s from origin: %s to destination: %s", 
            this.id,
            this.origin.peerId,
            this.destination.peerId
        );
    }

    private setOriginListeners() {
        this.origin.on("RTC_MESSAGE", (mssg) => {
            this.destination.sendMessage(mssg);
        });

        this.origin.on("END_CALL", () => {
            this.handleCallEnded(this.origin);
        });
    }

    private setDestinationListeners() {
        this.destination.on("CALL_RESPONSE", resp => {
            const { response } = resp;
            if(response === "ANSWER_CALL") { 
                this.handleCalledAnswered();
            } else {
                this.handleCallNotAnswered();
            }
        });

        this.destination.on("RTC_MESSAGE", (mssg) => {
            this.origin.sendMessage(mssg);
        });

        this.destination.on("END_CALL", () => {
            this.handleCallEnded(this.destination);
        });
    }

    private startCallMessage() {
        /** Start a timeout of sorts to end call if unanswered */
        
        this.destination.sendMessage({
            topic: "CALL_FROM_PEER",
            callId: this.id,
            peerId: this.origin.peerId
        });
    }

    private handleCalledAnswered() {
        console.log(
            "Peer: %s answered call: %s", 
            this.destination.peerId, 
            this.id
        );

        this.origin.sendMessage({
            topic: "CALL_RESPONSE",
            response: "ANSWERED",
            peerId: this.destination.peerId,
            callId: this.id
        });
    }

    private handleCallNotAnswered() {
        console.log(
            "Peer: %s did not answer call: %s", 
            this.destination.peerId, 
            this.id
        );
        this.origin.sendMessage({
            topic: "CALL_RESPONSE",
            response: "NOT_ANSWERED",
            peerId: this.destination.peerId,
            callId: this.id
        });
    }

    /**
     * 
     * @param p - Peer that ended the call
     */
    private handleCallEnded(p: Peer) { 
        console.log("Peer: %s is ending call", p.peerId);

        if(p === this.origin) { 
            this.destination.sendMessage({
                topic: "CALL_ENDED",
                callId: this.id,
                peerId: this.origin.peerId
            });
        } else { 
            this.origin.sendMessage({
                topic: "CALL_ENDED", 
                callId: this.id,
                peerId: this.destination.peerId
            });
        }

        this.emit("CALL_ENDED");
    }

    get callId() { return this.id; }
    set callId(id: number) { this.id = id; }
}

export default Call;