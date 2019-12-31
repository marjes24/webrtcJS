import React, { FC, useRef, useEffect, useState } from "react";

interface Props {
    stream: MediaStream | null;
    play: boolean;
}

const VideoPlayer: FC<Props> = ({ play, stream }) => {
    const videoEl = useRef<HTMLVideoElement>(null);
    const [vidSize, setSize] = useState({ width: 0, height: 0});

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