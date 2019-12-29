import Peer from "./peer";

class Call { 
    private id: number;
    private origin: Peer;
    private destination: Peer;

    constructor(origin: Peer, destination: Peer, id: number) { 
        this.origin = origin;
        this.destination = destination;
        this.id = id;

        this.setOriginListeners();
        this.setDestinationListeners();
        this.startCallMessage();

        console.log(
            "Created call: %s from origin: %s to destination: %s", 
            this.id,
            this.origin,
            this.destination
        );
    }

    private setOriginListeners() {
        this.origin.on("RTC_MESSAGE", (mssg) => {
            this.destination.sendMessage(mssg);
        });

        this.origin.on("END_CALL", () => {

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

        this.destination.on("END_CALL", () => {});
    }

    private startCallMessage() {
        /** Start a timeout of source to end call if unanswered */
        
        this.destination.sendMessage({
            topic: "CALL_FROM_PEER",
            callId: this.id,
            peerId: this.origin.peerId
        });
    }

    private handleCalledAnswered() {
        this.origin.sendMessage({
            topic: "CALL_RESPONSE",
            response: "ANSWERED",
            peerId: this.destination.peerId,
            callId: this.id
        });
    }

    private handleCallNotAnswered() {
        this.origin.sendMessage({
            topic: "CALL_RESPONSE",
            response: "NOT_ANSWERED",
            peerId: this.destination.peerId,
            callId: this.id
        });
    }

    get callId() { return this.id; }
    set callId(id: number) { this.id = id; }
}

export default Call;