export type Json =
    | string
    | number
    | boolean
    | null
    | { [property: string]: Json }
    | Json[];

export interface PeerMessage { 
    topic: string;
    [key: string]: any;
};

export type CallEvent = { 
    topic: "CALL_PEER";
    destinationPeer: number;
};

export type CallResponseEvent = { 
    topic: "CALL_RESPONSE";
    response: "ANSWER_CALL" | "IGNORE_CALL";
}
