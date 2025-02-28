import React from 'react';
import { useParams } from 'react-router-dom';
import { QueueContainer, RoomContainer, SearchBar, SearchForm, VideoPlayer } from './styled';
import YouTube from 'react-youtube';
import { RoomProvider, useRoomContext } from './RoomContext';
import NoVideo from '../../components/noVideo/NoVideo';
import Queue from '../../components/quene/Queue';

const RoomContent: React.FC = () => {
  const { queue, searchTerm, setSearchTerm, handleSearch } = useRoomContext();

  const videoId = queue.length > 0 ? queue[0].id : null;

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  return (
    <RoomContainer>
      <SearchForm onSubmit={handleSearch}>
        <SearchBar
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a video or paste a YouTube link..."
        />
      </SearchForm>
      <VideoPlayer>
        {videoId ? (
          <YouTube videoId={videoId} opts={opts} style={{ width: '100%', height: '100%' }} />
        ) : (
          <NoVideo />
        )}
      </VideoPlayer>
      <QueueContainer>
        <Queue />
      </QueueContainer>
      
    </RoomContainer>
  );
};

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <RoomProvider>
      <RoomContent />
    </RoomProvider>
  );
};

export default Room;