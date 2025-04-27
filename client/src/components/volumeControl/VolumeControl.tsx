import React, { useState } from 'react';
import { VolumeSlider, VolumeIconWrapper, VolumeControlWrapper } from './styled';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { VolumeControlProps } from './types';



const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume, player }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (player && typeof player.setVolume === 'function') {
      player.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    const newVolume = volume === 0 ? 100 : 0;
    setVolume(newVolume);
    if (player && typeof player.setVolume === 'function') {
      player.setVolume(newVolume);
    }
  };

  return (
    <VolumeControlWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VolumeIconWrapper onClick={toggleMute}>
        {volume === 0 ? <VolumeMuteIcon /> : <VolumeUpIcon />}
      </VolumeIconWrapper>
      {isHovered && (
        <VolumeSlider
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      )}
    </VolumeControlWrapper>
  );
};

export default VolumeControl;