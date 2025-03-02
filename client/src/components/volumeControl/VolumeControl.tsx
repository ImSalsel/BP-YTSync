import React from 'react';
import { VolumeSlider } from './styled';
import { YouTubePlayer } from 'react-youtube';

interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
  player: YouTubePlayer;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume, player }) => {
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (player && typeof player.setVolume === 'function') {
      player.setVolume(newVolume);
    }
  };

  return (
    <VolumeSlider
      type="range"
      min="0"
      max="100"
      value={volume}
      onChange={handleVolumeChange}
    />
  );
};

export default VolumeControl;