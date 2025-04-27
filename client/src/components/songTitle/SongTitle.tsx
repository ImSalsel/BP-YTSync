import React, { useEffect, useRef, useState } from 'react';
import { SongTitleContainer, SongTitleText, ScrollingText, StaticText } from './styled';
import VolumeControl from '../volumeControl/VolumeControl';
import TimeBar from '../timeBar/TimeBar';
import { useRoomContext } from '../../context/RoomContext';
import { SongTitleProps } from './types';



const SongTitle: React.FC<SongTitleProps> = ({ volume, setVolume, player }) => {
  const { queue } = useRoomContext();
  const currentSong = queue.length > 0 ? queue[0] : null;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [currentSong]);

  return (
    <SongTitleContainer>
      {currentSong ? (
        <SongTitleText ref={textRef}>
          {isOverflowing ? (
            <ScrollingText>{currentSong.title}</ScrollingText>
          ) : (
            <StaticText>{currentSong.title}</StaticText>
          )}
        </SongTitleText>
      ) : (
        <SongTitleText>No song playing</SongTitleText>
      )}
      
      <TimeBar />
      <VolumeControl volume={volume} setVolume={setVolume} player={player} />
    </SongTitleContainer>
  );
};

export default SongTitle;