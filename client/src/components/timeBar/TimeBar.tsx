import React, { useEffect, useState } from 'react';
import { useRoomContext } from '../../pages/room/RoomContext';
import { TimeBarContainer, ProgressBar, TimeText } from './styled';

const TimeBar: React.FC = () => {
  const { elapsedTime, player } = useRoomContext();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (elapsedTime !== null) {
      setCurrentTime(elapsedTime);
    }

    const interval = setInterval(() => {
      if (player && player.getCurrentTime) {
        setCurrentTime(player.getCurrentTime() * 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [elapsedTime, player]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <TimeBarContainer>
      <ProgressBar style={{ width: `${(currentTime / (player?.getDuration() * 1000)) * 100}%` }} />
      <TimeText>{formatTime(currentTime)} / {formatTime(player?.getDuration() * 1000 || 0)}</TimeText>
    </TimeBarContainer>
  );
};

export default TimeBar;