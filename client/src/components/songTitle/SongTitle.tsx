import React from 'react';
import { SongTitleContainer } from './styled';
import { useRoomContext } from '../../pages/room/RoomContext';
import VolumeControl from '../volumeControl/VolumeControl';
import { YouTubePlayer } from 'react-youtube';
import TimeBar from '../timeBar/TimeBar';

interface SongTitleProps {
  volume: number;
  setVolume: (volume: number) => void;
  player: YouTubePlayer;
}

const SongTitle: React.FC<SongTitleProps> = ({ volume, setVolume, player }) => {
  const { queue } = useRoomContext();
  const currentSong = queue.length > 0 ? queue[0] : null;

  return (
    <SongTitleContainer>
      {currentSong ? (
        <div>{currentSong.title}</div>
      ) : (
        <div>No song playing</div>
      )}
      <VolumeControl volume={volume} setVolume={setVolume} player={player} />
      <TimeBar />
    </SongTitleContainer>
  );
};

export default SongTitle;