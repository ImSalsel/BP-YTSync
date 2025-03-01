import React from 'react';
import { SongTitleContainer, VolumeSlider } from './styled';
import { useRoomContext } from '../../pages/room/RoomContext';

interface SongTitleProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const SongTitle: React.FC<SongTitleProps> = ({ volume, setVolume }) => {
  const { queue } = useRoomContext();
  const currentSong = queue.length > 0 ? queue[0] : null;

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return (
    <SongTitleContainer>
      {currentSong ? (
        <div>{currentSong.title}</div>
      ) : (
        <div>No song playing</div>
      )}
      <VolumeSlider
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
    </SongTitleContainer>
  );
};

export default SongTitle;