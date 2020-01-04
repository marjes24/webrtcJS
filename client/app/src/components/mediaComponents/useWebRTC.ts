import { useRef, useEffect, useContext, useState } from "react"
import { Nullable, CallState, CallStatus } from "../../common/types";
import {WsContext} from "../websocketCtx";

const useWebRTC = (callState: Nullable<CallState>, stream: Nullable<MediaStream>) => {
    const peerRef = useRef(null as Nullable<RTCPeerConnection>);
    const [remoteStream, setRemoteStream] = useState(null as Nullable<MediaStream>);
    const ws = useContext(WsContext);

    useEffect(() => {
        const startRTC = callState 
            && (peerRef.current == null)
            && callState.status === CallStatus.INACALL

        if(startRTC) {
            console.log("Creating rtc peer connection");
            
            // Create RTC peer and add event listeners
            const newPeer = new RTCPeerConnection();

            newPeer.addEventListener("icecandidate", evnt => {
                // Send any ice candidates to the other peer
                console.log("ice-candidate event handler");
                if(evnt.candidate) {
                    ws?.send(JSON.stringify({
                        topic: "RTC_MESSAGE",
                        type: "iceCandidate",
                        candidate: evnt.candidate,
                        targetID: callState?.targetPeer
                    }));
                }
            });

            newPeer.addEventListener("iceconnectionstatechange", evnt => {
                console.log("iceconnectionstatechange event handler - %s", newPeer.iceConnectionState);
            });

            newPeer.addEventListener("track", evnt => {
                console.log("track event handler");
                console.log(evnt.streams);
                const stream = evnt.streams[0];
                setRemoteStream(stream);
            });

            stream?.getTracks().forEach(t =>{
                console.log("Peer adding tracks");
                newPeer.addTrack(t, stream)}
            );

            // Create and send offer if this peer is the initiator
            (async () => {
                if(!callState?.initiator) return;

                try { 
                    console.log("Creating sdp offer");
                    const desc = await newPeer.createOffer();
                    await newPeer.setLocalDescription(desc);

                    ws?.send(JSON.stringify({
                        topic: "RTC_MESSAGE",
                        type: "sdp",
                        sdp: newPeer.localDescription,
                        targetID: callState?.targetPeer
                    }));
                } catch(err) {
                    console.error(`Error creating offer ${err.what}`)
                }
            })();
            
            peerRef.current = newPeer;
        }
    }, [callState, stream, ws]);

    // Add websocket event handlers
    useEffect(() => {
        if(!ws) return;

        const messageHandler = ({data}: MessageEvent) => {
            try { 
                const mssg = JSON.parse(data);
                const rtcPeer = peerRef.current

                console.log("rtc peer has a value?: %s", rtcPeer);

                // Only handle rtc messages
                if(mssg.topic !== "RTC_MESSAGE" || !rtcPeer) return;

                const type: string = mssg.type;

                if(type === "sdp") {
                    console.log("Received session description message");
                    rtcPeer.setRemoteDescription(mssg.sdp);

                    // Respond back
                    if(callState?.initiator == false) {
                        (async () => {
                            try {   
                                console.log("Creating rtc answer ...")
                                const desc = await rtcPeer.createAnswer();
                                await rtcPeer.setLocalDescription(desc);
                                ws.send(JSON.stringify({
                                    topic: "RTC_MESSAGE",
                                    type: "sdp",
                                    sdp: desc, 
                                    targetID: callState.targetPeer
                                }))
                            } catch(err) { 
                                console.error(`Error creating sdp response ${err.what}`);
                            }
                        })();
                    }
                } else if(type === "iceCandidate") {
                    console.log("Adding ice candidate...")
                    const candidate = new RTCIceCandidate(mssg.candidate);
                    rtcPeer
                        .addIceCandidate(candidate)
                        .catch(err => console.error("Error adding ice candidate"));
                }
            } catch(err) {
                console.error(`Error handling message event ${err.message}`);
            }
        };

        const addMessageHandler = () => ws.addEventListener("message", messageHandler);
        const addOnOpen = () => addMessageHandler();

        const { readyState } = ws;
        if(readyState === WebSocket.OPEN) 
            addMessageHandler();
        else if(readyState === WebSocket.CONNECTING)
            ws.addEventListener("open", addOnOpen);

        return () => {
            // cleanup websocket subcriptions
            ws?.removeEventListener("open", addOnOpen);
            ws?.removeEventListener("message", messageHandler);
        }
    },[callState, ws, peerRef]);

    return remoteStream;
}

export { useWebRTC };