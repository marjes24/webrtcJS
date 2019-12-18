import React, { FC, useRef, useEffect } from "react";

interface Props {
    stream: MediaStream | null;
    play: boolean;
}

const VideoPlayer: FC<Props> = ({ play, stream }) => {
    const videoEl = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoEl.current && stream)
            videoEl.current.srcObject = stream;
    }, [play, stream]);

    return (
        <video
            ref={videoEl}
            width={600}
            height={600}
            autoPlay={true}
        >
        </video>
    );
}

export { VideoPlayer }