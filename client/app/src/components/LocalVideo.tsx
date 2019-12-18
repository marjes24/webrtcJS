import React, { FC, useState, Suspense } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { useMedia} from "./useMedia";
import { Nullable } from "../common/types";

interface Props { 
    setStream: (strm: Nullable<MediaStream>) => void;
}

const LocalVideo: FC<Props> = props => {
    const [play, playVideo] = useState(false);

    const stream = useMedia(play);

    props.setStream(stream);

    return (
        <>
            <VideoPlayer play={play} stream={stream} />
            <button
                onClick={e => playVideo(!play)}
            >
                { play ? "Stop Video" :"Play Video"   }
        </button>
        </>
    )
};

export { LocalVideo };