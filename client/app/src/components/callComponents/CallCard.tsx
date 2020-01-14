import React, { FC } from 'react';
import { StatusMessage } from './StatusMessage';
import {
    Card,
    CardContent,
    createStyles,
    makeStyles,
    CardActions
} from '@material-ui/core';
import { CallState, Nullable } from '../../common/types';
import { CallButtons } from './CallButtons';

interface Props {
    callState: Nullable<CallState>;
    callPeer: () => void;
    respondToCall: (accept: boolean) => void;
    endCall: () => void;
}

const useStyle = makeStyles(t =>
    createStyles({
        cardRoot: {
            minWidth: 300
        },
        cardContentRoot: {
            minHeight: 125
        }
    })
);

const CallCard: FC<Props> = props => {
    const classes = useStyle(props);

    return (
        <Card className={classes.cardRoot}>
            <CardContent className={classes.cardContentRoot}>
                <StatusMessage callState={props.callState} />
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
