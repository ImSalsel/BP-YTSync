import React from 'react';
import { QueueContainer, RoomContainer, SearchBar, SearchForm, VideoPlayer } from './styled';
import YouTube from 'react-youtube';
import { RoomProvider, useRoomContext } from './RoomContext';
import NoVideo from '../../components/noVideo/NoVideo';
import Queue from '../../components/quene/Queue';
import SongTitle from '../../components/songTitle/SongTitle';
import TopBar from '../../components/topBar/TopBar';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

const RoomContent: React.FC = () => {
  const { searchTerm, setSearchTerm, handleSearch, opts, onReady, videoId, volume, setVolume, player, errorMessage } = useRoomContext();

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
      {errorMessage && <ErrorMessage message={errorMessage} />}
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
  return (
    <RoomProvider>
      <RoomContent />
    </RoomProvider>
  );
};

export default Room;