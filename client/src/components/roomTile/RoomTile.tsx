import React from 'react';
import { LockIconContainer, RoomTileContainer, UserCount } from "./styled";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock'; 

interface RoomTileProps {
  name: string;
  userCount: number;
  isPublic: boolean;
  onClick: () => void;
}

const RoomTile: React.FC<RoomTileProps> = ({ name, userCount, isPublic, onClick }) => {
  return (
    <RoomTileContainer onClick={onClick}>
      {name}
      <UserCount>
        {userCount} <PersonIcon />
      </UserCount>
      <LockIconContainer>
        {!isPublic && <LockIcon style={{ marginLeft: '10px', color: '#ffffff' }} />} 
      </LockIconContainer>
    </RoomTileContainer>
  );
};

export default RoomTile;