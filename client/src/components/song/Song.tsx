import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { SongProps } from './types';
import { Thumbnail, SongDetails, VoteButtons, VoteItem } from './styled';



const trimTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
};

const Song: React.FC<SongProps> = ({ video, isPrivate, onVote, onRemove }) => {
  return (
    <div>
      <Thumbnail src={video.thumbnail} alt={video.title} />
      <SongDetails>
        <div title={video.title}>
          <strong>{trimTitle(video.title, 25)}</strong>
        </div>
        <div>Duration: {new Date(video.duration).toISOString().substr(11, 8)}</div>
        {!isPrivate ? (
          <VoteButtons>
            <VoteItem onClick={() => onVote(video.id, 'like')}>
              <ThumbUpIcon style={{ color: 'green', marginRight: '5px' }} />
              <span>{video.likes}</span>
            </VoteItem>
            <VoteItem onClick={() => onVote(video.id, 'dislike')}>
              <ThumbDownIcon style={{ color: 'red', marginRight: '5px' }} data-testid="dislike" />
              <span>{video.dislikes}</span>
            </VoteItem>
          </VoteButtons>
        ) : (
          <button onClick={onRemove}>Remove</button>
        )}
      </SongDetails>
    </div>
  );
};

export default Song;