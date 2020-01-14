import React, { FC } from 'react';
import { CallState, CallStatus, Nullable } from '../../common/types';
import { CardHeader, CardContent, Typography } from '@material-ui/core';

interface Props {
    callState: Nullable<CallState>;
}

/**
 * Component that displays a message whenever there is a call
 * or in the process of calling/receiving a call
 */
const StatusMessage: FC<Props> = ({ callState }) => {
    let mssg = '';
    const status = callState?.status ?? CallStatus.NONE;

    if (!callState || status === CallStatus.NONE)
        mssg = 'Select a peer to call';
    else if (status === CallStatus.CALLING)
        mssg = 'Calling Peer ' + callState.targetPeer;
    else if (status === CallStatus.BEINGCALLED)
        mssg = 'Receiving call from Peer ' + callState.targetPeer;
    else if (status === CallStatus.INACALL)
        mssg = 'In a call with Peer ' + callState.targetPeer;

    return (
        <>
            <Typography component="h5" variant="h5">
                Call Status
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                {mssg}
            </Typography>
        </>
    );
};

export { StatusMessage };
