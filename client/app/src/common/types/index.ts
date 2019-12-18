export type Nullable<T> = T | null

export enum CallState { 
    NONE,
    CONNECTING,
    CONNECTED
};

export enum Status { 
    BUSY, 
    AVAILABLE, 
    INACALL
}

export interface Peer { 
    id: string,
    status: Status
    callState: CallState
}

export interface PeersObj { 
    [key: string]: Peer
}
