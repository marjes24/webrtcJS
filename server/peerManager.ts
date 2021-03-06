import Peer from "./peer";
import ws from "ws";
import CallManager from "./callManager";

class PeerManager { 
    private idCount: number;
    private peers: Map<number, Peer>;
    private callManager: CallManager;

    constructor() {
        this.idCount = 0;
        this.peers = new Map();
        this.callManager = new CallManager();
    }

    private addPeer(p: Peer) {
        if(this.peers.has(p.peerId)) { 
            console.error("Peer: %s already exists", p.peerId);
            return;
        }

        this.peers.set(p.peerId, p);

        p.on("CALL_PEER", (callMssg) => {
            this.setCall(p.peerId, callMssg.destinationPeer);
        });

        p.on("CLOSE", () => {
            if(this.peers.has(p.peerId)) this.peers.delete(p.peerId);
            this.broadCastPeers();
        });

        this.broadCastPeers();
    }   

    private setCall(originId: number, destinationId: number) {
        console.log(
            "Call from p1: %s to p2: %s...",
            originId,
            destinationId
        );

        if(this.peers.has(originId) && this.peers.has(destinationId)) {
            const originPeer = this.peers.get(originId);
            const destinationPeer = this.peers.get(destinationId);

            this.callManager.createCall(originPeer!, destinationPeer!);

            // Add call listeners ( exmaple on call ending broadcast all peers again);
        } else { 
            console.error("Peers for call where not found");
        }
    }

    private broadCastPeers() { 
        console.log("Broadcasting connected peers...");
        type PeerList = {
            [key: number]: ReturnType<Peer["serialize"]>;
        };
        const availablePeers = {} as PeerList;

        this.peers.forEach(p => {
            availablePeers[p.peerId] = p.serialize();
        });

        this.peers.forEach(p => p.sendMessage({
            topic: "AVAILABLE_PEERS",
            peers: availablePeers
        }));

        console.log(availablePeers);
    }

    public createPeer(ws: ws) { 
        ++this.idCount;
        
        const p = new Peer(ws, this.idCount);
        this.addPeer(p);
    }
}

export default PeerManager;