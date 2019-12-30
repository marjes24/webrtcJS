import { useEffect, useState } from "react";
import { Nullable } from "../common/types";

/**
 * Hook to start or stop stream from webcam
 * @param play - Should start user media
 */
const useMedia = (play: boolean) => {
    const [stream, setStream] = useState(null as Nullable<MediaStream>);

    useEffect(() => {
        if(!play && !stream) return;

        if(!play && stream) {
            const tracks = stream.getTracks();
            tracks.forEach(t => t.stop());
            setStream(null);
            return;
        }

        (async () => {
            const stream = await navigator
                .mediaDevices
                .getUserMedia({ video: true });
                
            setStream(stream);
        })(); 
    },[play]);

    console.log("returning stream");
    return stream;
};

export { useMedia }