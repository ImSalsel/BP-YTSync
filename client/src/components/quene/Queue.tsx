import { QueueContainer, Song, Thumbnail, SongDetails, VoteButtons, VoteItem } from './styled';
import { useRoomContext } from '../../pages/room/RoomContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Queue: React.FC = () => {
  const { queue, removeSong, socket, roomId, isPrivate } = useRoomContext();

  const trimTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  const handleVote = (videoId: string, voteType: 'like' | 'dislike') => {
    socket?.emit('voteVideo', roomId, videoId, voteType, socket.id);
    console.log(`Voted ${voteType} for video ID: ${videoId}`);
    console.log(`${queue.at(0)?.votes.likes} likes, ${queue.at(0)?.votes.dislikes} dislikes`);  
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
            {!isPrivate ? (
              <VoteButtons>
              <VoteItem onClick={() => handleVote(video.id, 'like')}>
                <ThumbUpIcon style={{ color: 'green', marginRight: '5px' }} />
                <span>{video.likes}</span>
                </VoteItem>
              <VoteItem onClick={() => handleVote(video.id, 'dislike')}>
                <ThumbDownIcon style={{ color: 'red', marginRight: '5px' }} data-testid="dislike" />
                <span>{video.dislikes}</span>
                </VoteItem>
            </VoteButtons>
            ) : (
              <button onClick={() => removeSong(index)}>Remove</button>
            )}
          </SongDetails>
        </Song>
      ))}
    </QueueContainer>
  );
};

export default Queue;