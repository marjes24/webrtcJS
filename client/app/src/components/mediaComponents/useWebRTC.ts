import { useRef, useEffect, useContext, useState, useCallback } from 'react';
import { Nullable, CallState, CallStatus } from '../../common/types';
import { WsContext } from '../websocketCtx';
import { useMessageListener } from '../useMessageLister';

/**
 * Hook that will handle webrtc creation and communication
 * @param callState
 * @param stream
 */
const useWebRTC = (
    callState: Nullable<CallState>,
    stream: Nullable<MediaStream>
) => {
    const peerRef = useRef(null as Nullable<RTCPeerConnection>);
    const [remoteStream, setRemoteStream] = useState(
        null as Nullable<MediaStream>
    );
    const ws = useContext(WsContext);

    // Handle creation of peer connections
    useEffect(() => {
        const createRTC =
            callState &&
            peerRef.current == null &&
            callState.status === CallStatus.INACALL &&
            ws;

        if (createRTC) {
            console.log('Creating rtc peer connection');

            // Create RTC peer and add event listeners
            const newPeer = new RTCPeerConnection();

            // Send any ice candidates to the other peer
            newPeer.addEventListener('icecandidate', evnt => {
                console.log('ice-candidate event handler');
                if (evnt.candidate) {
                    ws?.send(
                        JSON.stringify({
                            topic: 'RTC_MESSAGE',
                            type: 'iceCandidate',
                            candidate: evnt.candidate,
                            targetID: callState?.targetPeer
                        })
                    );
                }
            });

            newPeer.addEventListener('iceconnectionstatechange', evnt => {
                console.log(
                    'iceconnectionstatechange event handler state: %s',
                    newPeer.iceConnectionState
                );
            });

            newPeer.addEventListener('track', evnt => {
                console.log('track event handler');
                const stream = evnt.streams[0];
                setRemoteStream(stream);
            });

            stream?.getTracks().forEach(t => {
                console.log('Peer adding tracks');
                newPeer.addTrack(t, stream);
            });

            // Create and send offer if this peer is the initiator
            (async () => {
                const initiator = callState?.initiator ?? false;

                if (!initiator) return;

                try {
                    console.log('Creating sdp offer');
                    const desc = await newPeer.createOffer();
                    await newPeer.setLocalDescription(desc);

                    ws?.send(
                        JSON.stringify({
                            topic: 'RTC_MESSAGE',
                            type: 'sdp',
                            sdp: newPeer.localDescription,
                            targetID: callState?.targetPeer
                        })
                    );
                } catch (err) {
                    console.error(`Error creating offer ${err.what}`);
                }
            })();

            peerRef.current = newPeer;
        }

        const closeRTC = callState == null && peerRef.current;

        if (closeRTC) {
            console.log('Closing rtc connection');
            peerRef.current?.close();
            peerRef.current = null;
            setRemoteStream(null);
        }
    }, [callState, stream, ws]);

    // Create and add websocket message handler for rtc messages
    const messageHandler = useCallback(
        ({ data }: MessageEvent) => {
            try {
                const mssg = JSON.parse(data);
                const rtcPeer = peerRef.current;

                // Only handle rtc messages
                if (mssg.topic !== 'RTC_MESSAGE' || !rtcPeer) return;

                const type: string = mssg.type;

                if (type === 'sdp') {
                    console.log('Received session description message');
                    rtcPeer
                        .setRemoteDescription(mssg.sdp)
                        .catch(err => console.error(err));

                    // Respond back
                    if (callState?.initiator === false) {
                        (async () => {
                            try {
                                console.log('Creating rtc answer ...');
                                const desc = await rtcPeer.createAnswer();
                                await rtcPeer.setLocalDescription(desc);
                                ws!.send(
                                    JSON.stringify({
                                        topic: 'RTC_MESSAGE',
                                        type: 'sdp',
                                        sdp: desc,
                                        targetID: callState.targetPeer
                                    })
                                );
                            } catch (err) {
                                console.error(
                                    `Error creating sdp response ${err.what}`
                                );
                            }
                        })();
                    }
                } else if (type === 'iceCandidate') {
                    console.log('Adding ice candidate...');
                    const candidate = new RTCIceCandidate(mssg.candidate);
                    rtcPeer
                        .addIceCandidate(candidate)
                        .catch(err =>
                            console.error('Error adding ice candidate')
                        );
                }
            } catch (err) {
                console.error(`Error handling message event ${err.message}`);
            }
        },
        [ws, callState, peerRef]
    );

    // Add message handler to websocket message event
    useMessageListener(messageHandler);

    return remoteStream;
};

export { useWebRTC };
