import { QueueContainer } from './styled';
import { useRoomContext } from '../../context/RoomContext';
import Song from '../song/Song';

const Queue: React.FC = () => {
  const { queue, removeSong, socket, roomId, isPrivate } = useRoomContext();

  const handleVote = (videoId: string, voteType: 'like' | 'dislike') => {
    socket?.emit('voteVideo', roomId, videoId, voteType, socket.id);
    console.log(`Voted ${voteType} for video ID: ${videoId}`);
  };

  return (
    <QueueContainer>
      {queue.map((video, index) => (
        <Song
          key={index}
          video={video}
          isPrivate={isPrivate}
          onVote={handleVote}
          onRemove={() => removeSong(index)}
        />
      ))}
    </QueueContainer>
  );
};

export default Queue;