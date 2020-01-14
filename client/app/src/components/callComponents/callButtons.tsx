import React, { FC } from 'react';
import { CallState, Nullable, CallStatus } from '../../common/types';
import { MuiButton } from '../styleComponents/MuiButton';

interface DefaultProps {
    call: () => void;
}

const DefaultOptions: FC<DefaultProps> = props => {
    return (
        <MuiButton display="green" onClick={e => props.call()}>
            Call
        </MuiButton>
    );
};

interface InACallOptions {
    endCall: () => void;
}

const InACallOptions: FC<InACallOptions> = props => {
    return (
        <MuiButton display="red" onClick={e => props.endCall()}>
            End Call
        </MuiButton>
    );
};

interface ReceivingCallProps {
    answer: () => void;
    ignore: () => void;
}

const ReceivingCallOptions: FC<ReceivingCallProps> = props => {
    return (
        <>
            <MuiButton display="green" onClick={e => props.answer()}>
                Answer
            </MuiButton>
            <MuiButton display="red" onClick={e => props.ignore()}>
                Ignore
            </MuiButton>
        </>
    );
};

interface Props {
    callPeer: () => void;
    respondToCall: (answer: boolean) => void;
    endCall: () => void;
    callState: Nullable<CallState>;
}

const CallButtons: FC<Props> = props => {
    const answer = () => props.respondToCall(true);
    const ignore = () => props.respondToCall(false);

    const callStatus = props.callState?.status ?? CallStatus.NONE;

    if (callStatus === CallStatus.CALLING) {
        return <InACallOptions endCall={props.endCall} />;
    } else if (callStatus === CallStatus.BEINGCALLED) {
        return <ReceivingCallOptions answer={answer} ignore={ignore} />;
    } else if (callStatus === CallStatus.INACALL) {
        return <InACallOptions endCall={props.endCall} />;
    } else {
        return <DefaultOptions call={props.callPeer} />;
    }
};

export { CallButtons };
