import Call from "./call";
import Peer from "./peer";

class CallManager {
    private calls: Map<number, Call>;
    private idCount: number;

    constructor() {
        this.calls = new Map();
        this.idCount = 0;
    }

    public createCall(origin: Peer, destination: Peer) {
        ++this.idCount;

        const call = new Call(origin, destination, this.idCount);
        this.calls.set(call.callId, call);
    }

    public removeCall(c: Call) {
        const { calls } = this;
        if(calls.has(c.callId)) { 
            calls.delete(c.callId);
        }
    }
}

export default CallManager;