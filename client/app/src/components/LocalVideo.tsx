import React, { FC, useState, Suspense } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { useMedia} from "./useMedia";

const LocalVideo: FC = props => {
    const [play, playVideo] = useState(false);

    const stream = useMedia(play);

    return (
        <>
            <VideoPlayer play={play} stream={stream} />
            <button
                onClick={e => playVideo(!play)}
            >
                Play Video
        </button>
        </>
    )
};

export { LocalVideo };