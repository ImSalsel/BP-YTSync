import React from 'react';
import { SongTitleContainer, SongTitleText } from './styled';
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
        <SongTitleText>{currentSong.title}</SongTitleText>
      ) : (
        <SongTitleText>No song playing</SongTitleText>
      )}
      
      <TimeBar />
      <VolumeControl volume={volume} setVolume={setVolume} player={player} />
    </SongTitleContainer>
  );
};

export default SongTitle;