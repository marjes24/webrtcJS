import React, { FC } from 'react';
import { StatusMessage } from './StatusMessage';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { CallState, Nullable, PeersObj } from '../../common/types';
import { CallButtons } from './CallButtons';
import { PeerList } from './PeerList';
import { useStyle } from './cardStyles';

interface Props {
    callState: Nullable<CallState>;
    peers: PeersObj;
    selfId: Nullable<number>;
    selectedId: Nullable<number>;
    callPeer: () => void;
    respondToCall: (accept: boolean) => void;
    endCall: () => void;
    selectPeer: (peerId: number) => void;
}

const CallCard: FC<Props> = props => {
    const classes = useStyle(props);

    return (
        <Card className={classes.cardRoot}>
            <CardContent>
                <Typography component="h5" variant="h5">
                    Call Status
                </Typography>
            </CardContent>
            <CardContent className={classes.cardContentRoot}>
                <StatusMessage callState={props.callState} />
                <PeerList
                    selfId={props.selfId}
                    callState={props.callState}
                    peers={props.peers}
                    selectPeer={props.selectPeer}
                    selectedId={props.selectedId}
                />
            </CardContent>
            <CardActions>
                <CallButtons
                    callState={props.callState}
                    callPeer={props.callPeer}
                    respondToCall={props.respondToCall}
                    endCall={props.endCall}
                />
            </CardActions>
        </Card>
    );
};

export { CallCard };
