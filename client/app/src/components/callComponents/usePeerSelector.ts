import { useState } from 'react';
import { CallStatus, Nullable, CallState } from '../../common/types';

/**
 * Custom hook that uses call state to provide current selected peer and
 * peer selection function. (i.e if in a call then current peer is the
 * target peer and select peer is disabled)
 * @param callState
 */
const usePeerSelector = (callState: Nullable<CallState>) => {
    const [selectedPeerId, setPeer] = useState(null as Nullable<number>);

    if (!callState) return [selectedPeerId, setPeer] as const;

    let selectedPeer = selectedPeerId;

    if (callState.status != CallStatus.NONE)
        selectedPeer = callState.targetPeer;

    const selectPeer = (peerId: Nullable<number>) => {
        // Only allow peer selection when not in one of the call/calling/called states
        const status = callState?.status ?? CallStatus.NONE;
        if (status === CallStatus.NONE) setPeer(peerId);
    };

    return [selectedPeer, selectPeer] as const;
};

export { usePeerSelector };
