import React, { FC, useRef, useEffect } from "react";

interface Props {
    stream: MediaStream | null;
    play: boolean;
}

const VideoPlayer: FC<Props> = ({ play, stream }) => {
    const videoEl = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(!videoEl.current) return;

        const videoRef = videoEl.current;

        const removeSrc = () => {
            videoRef.removeAttribute("src");
            videoRef.removeAttribute("srcObject");
        }

        if (stream && play) {
            videoRef.srcObject = stream;
            videoRef.play();
        } else if(stream && !play) {
            removeSrc();
        } else if (!stream) {
            removeSrc();
        }
    }, [play, stream]);

    return <video ref={videoEl}/>
}

export { VideoPlayer }