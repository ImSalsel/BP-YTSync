import React from 'react';
import { useParams } from 'react-router-dom';
import { QueueContainer, RoomContainer, SearchBar, SearchForm, VideoPlayer } from './styled';
import YouTube from 'react-youtube';
import { RoomProvider, useRoomContext } from './RoomContext';
import NoVideo from '../../components/noVideo/NoVideo';
import Queue from '../../components/quene/Queue';
import SongTitle from '../../components/songTitle/SongTitle';
import TopBar from '../../components/topBar/TopBar';

const RoomContent: React.FC = () => {
  const { searchTerm, setSearchTerm, handleSearch, opts, onReady, videoId, volume, setVolume, player } = useRoomContext();

  return (
    <RoomContainer>
      <TopBar />
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
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <NoVideo />
        )}
      </VideoPlayer>
      <QueueContainer>
        <Queue />
      </QueueContainer>
      <SongTitle volume={volume} setVolume={setVolume} player={player} />
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