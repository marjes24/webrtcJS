import React, { FC } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { useMedia } from './useMedia';
import { Nullable } from '../../common/types';

interface Props {
    setStream: (strm: Nullable<MediaStream>) => void;
    play: boolean;
}

const LocalVideo: FC<Props> = props => {
    const { play } = props;

    //Get local stream
    const stream = useMedia(play);

    // Set local-stream state for parent component
    props.setStream(stream);

    return (
        <div className="video-wrapper">
            <VideoPlayer play={play} stream={stream} />
        </div>
    );
};

export { LocalVideo };
