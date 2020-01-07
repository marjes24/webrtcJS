import { useEffect, useState, useRef } from 'react';
import { Nullable } from '../../common/types';

/**
 * Hook to start or stop stream from webcam
 * @param play - Should start user media
 */
const useMedia = (play: boolean) => {
    const [stream, setStream] = useState(null as Nullable<MediaStream>);
    const streamRef = useRef(null as Nullable<MediaStream>);

    useEffect(() => {
        const currStream = streamRef.current;

        if (!play && !currStream) return;

        // On stop playing
        if (!play && currStream) {
            const tracks = currStream.getTracks();
            tracks.forEach(t => t.stop());
            streamRef.current = null;
            setStream(null);
            return;
        }

        // On start playing
        (async () => {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });

                streamRef.current = newStream;
                setStream(newStream);
            } catch (err) {
                console.error(`getUserMedia() error - ${err.what}`);
            }
        })();
    }, [play]);

    return stream;
};

export { useMedia };
