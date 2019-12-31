import React, { FC } from "react";

interface Props { }

const CallButtons: FC<Props> = props => {

    return (
        <div id="call-buttons">
            <div className="btn-wrapper">
                <button className="green">Call</button>
            </div>
        </div>
    );
};

export { CallButtons };