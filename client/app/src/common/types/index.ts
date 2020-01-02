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
    id: number,
    status: PeerStatus
    callState: CallStatus
}

export interface PeersObj { 
    [key: string]: Peer
}

export type CallState = { 
    status: CallStatus;
    targetPeer: number;
    callId?: number;
    /**
     * Whether or not this client initiated the call
     */
    initiator: boolean;
};
