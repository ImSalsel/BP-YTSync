import React from 'react';
import { useParams } from 'react-router-dom';
import { TopBarContainer, HomeButton, RoomName } from './styled';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <TopBarContainer>
      <HomeButton onClick={handleHomeClick}>🏠</HomeButton>
      <RoomName>{roomId}</RoomName>
    </TopBarContainer>
  );
};

export default TopBar;