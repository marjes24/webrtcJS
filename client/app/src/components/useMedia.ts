import { useEffect, useState } from "react";

const useMedia = (play: boolean) => {
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if(!play) return;

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