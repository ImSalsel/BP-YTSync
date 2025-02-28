import React from 'react';
import { QueueContainer, Song } from './styled';
import { useRoomContext } from '../../pages/room/RoomContext';

const Queue: React.FC = () => {
  const { queue, removeSong } = useRoomContext();

  return (
    <QueueContainer>
      {queue.map((video, index) => (
        <Song key={index}>
          <div>{video.title}</div>
          <button onClick={() => removeSong(index)}>Remove</button>
        </Song>
      ))}
    </QueueContainer>
  );
};

export default Queue;