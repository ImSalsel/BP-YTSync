import React from 'react';
import { QueueContainer, Song } from './styled';
import useRoom from '../../pages/room/useRoom';

const Queue: React.FC = () => {
  const { queue } = useRoom();

  return (
    <QueueContainer>
      {queue.map((video, index) => (
        <Song key={index}>
          <div>{video.title}</div>
        </Song>
      ))}
    </QueueContainer>
  );
};

export default Queue;