export type Nullable<T> = T | null

export enum CallStatus { 
    NONE,
    CALLING,
    BEINGCALLED,
    INACALL
};

export enum PeerStatus { 
    BUSY, 
    AVAILABLE, 
    INACALL
}

export interface Peer { 
    id: string,
    status: PeerStatus
    callState: CallStatus
}

export interface PeersObj { 
    [key: string]: Peer
}

export type CallState = { 
    status: CallStatus;
    targetPeer: Peer;
    callId: number;
};
