import React, { FC, useState, Suspense } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { useMedia } from "./useMedia";
import { Nullable } from "../common/types";

interface Props {
    setStream: (strm: Nullable<MediaStream>) => void;
}

const LocalVideo: FC<Props> = props => {
    const [play, playVideo] = useState(false);

    const stream = useMedia(play);

    props.setStream(stream);

    return (
        <div className="video-wrapper">
            <VideoPlayer play={play} stream={stream} />
            <button
                id="play-local"
                className={play ? "red" : "green"}
                onClick={e => playVideo(!play)}
            >
                {play ? "Stop Video" : "Start Video"}
            </button>
        </div>
    )
};

export { LocalVideo };