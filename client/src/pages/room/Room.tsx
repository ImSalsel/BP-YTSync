import React from 'react';
import { RoomContainer, VideoPlayer, ChatContainer } from './styled';

const Room: React.FC = () => {
  return (
    <RoomContainer>

      <VideoPlayer>
        {/* Video player will be implemented here */}
      </VideoPlayer>

      <ChatContainer>
      </ChatContainer>
      
    </RoomContainer>
  );
};

export default Room;