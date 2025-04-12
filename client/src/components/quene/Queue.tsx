import React from 'react';
import { QueueContainer, Song, Thumbnail, SongDetails } from './styled';
import { useRoomContext } from '../../pages/room/RoomContext';

const Queue: React.FC = () => {
  const { queue, removeSong } = useRoomContext();


  const trimTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  return (
    <QueueContainer>
      {queue.map((video, index) => (
        <Song key={index}>
          <Thumbnail src={video.thumbnail} alt={video.title} />
          <SongDetails>
            <div title={video.title}>
              <strong>{trimTitle(video.title, 25)}</strong>
            </div>
            <div>Duration: {new Date(video.duration).toISOString().substr(11, 8)}</div>
          </SongDetails>
          <button onClick={() => removeSong(index)}>Remove</button>
        </Song>
      ))}
    </QueueContainer>
  );
};

export default Queue;