import React from 'react';
import { useParams } from 'react-router-dom';
import { TopBarContainer, HomeButton, RoomName, UserCount } from './styled';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from '../../pages/room/RoomContext';

const TopBar: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { userCount } = useRoomContext();

  const handleHomeClick = () => {
    navigate('/');
  };

  console.log('userCount', userCount);
  return (
    <TopBarContainer>
      <HomeButton onClick={handleHomeClick}>🏠</HomeButton>
      <RoomName>{roomId}</RoomName>
      <UserCount>{userCount} users</UserCount>
    </TopBarContainer>
  );
};

export default TopBar;