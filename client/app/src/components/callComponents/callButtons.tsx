import React, { FC } from 'react';
import { CallState, Nullable, CallStatus } from '../../common/types';

interface DefaultProps {
    call: () => void;
}

const DefaultOptions: FC<DefaultProps> = props => {
    return (
        <div id="call-buttons">
            <div className="btn-wrapper">
                <button className="green" onClick={e => props.call()}>
                    Call
                </button>
            </div>
        </div>
    );
};

interface InACallOptions {
    endCall: () => void;
}

const InACallOptions: FC<InACallOptions> = props => {
    return (
        <div id="call-buttons">
            <div className="btn-wrapper">
                <button className="red" onClick={e => props.endCall()}>
                    End Call
                </button>
            </div>
        </div>
    );
};

interface ReceivingCallProps {
    answer: () => void;
    ignore: () => void;
}

const ReceivingCallOptions: FC<ReceivingCallProps> = props => {
    return (
        <div id="call-buttons">
            <div className="btn-wrapper">
                <button className="green" onClick={e => props.answer()}>
                    Answer
                </button>
            </div>
            <div className="btn-wrapper">
                <button className="red" onClick={e => props.ignore()}>
                    Ignore
                </button>
            </div>
        </div>
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
        return <div id="call-buttons"></div>;
    }

    if (callStatus === CallStatus.BEINGCALLED) {
        return <ReceivingCallOptions answer={answer} ignore={ignore} />;
    }

    if (callStatus === CallStatus.INACALL) {
        return <InACallOptions endCall={props.endCall} />;
    }

    return <DefaultOptions call={props.callPeer} />;
};

export { CallButtons };
