import React, { FC, useRef, useEffect } from "react";

interface Props {
    stream: MediaStream | null;
    play: boolean;
}

const VideoPlayer: FC<Props> = ({ play, stream }) => {
    const videoEl = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoEl.current && stream) {
            const videoRef = videoEl.current;
            videoRef.srcObject = stream;
            videoRef.play();
        }
    }, [play, stream]);

    return (
        <video ref={videoEl}/>
    );
}

export { VideoPlayer }