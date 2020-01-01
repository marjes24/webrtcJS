import React, { FC } from "react";

interface Props { 
    callPeer: () => void;
}

const CallButtons: FC<Props> = props => {

    return (
        <div id="call-buttons">
            <div className="btn-wrapper">
                <button 
                    className="green"
                    onClick={e => props.callPeer()}
                >
                    Call
                </button>
            </div>
        </div>
    );
};

export { CallButtons };