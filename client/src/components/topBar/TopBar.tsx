import React from 'react';
import { useParams } from 'react-router-dom';
import { TopBarContainer, HomeButton, RoomName, UserCount } from './styled';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from '../../pages/room/RoomContext';
import PersonIcon from '@mui/icons-material/Person';

import homeIcon from '../../assets/homeIcon.svg';

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
      <HomeButton onClick={handleHomeClick}>
        <img src={homeIcon} alt="Home" />
      </HomeButton>
      <RoomName>{roomId}</RoomName>
      <UserCount>{userCount} <PersonIcon /></UserCount>
    </TopBarContainer>
  );
};

export default TopBar;