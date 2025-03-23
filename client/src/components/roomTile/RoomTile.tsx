import React from 'react';
import { RoomTileContainer, UserCount } from "./styled";
import PersonIcon from '@mui/icons-material/Person';

interface RoomTileProps {
  name: string;
  userCount: number;
  onClick: () => void;
}

const RoomTile: React.FC<RoomTileProps> = ({ name, userCount, onClick }) => {
  return (
    <RoomTileContainer onClick={onClick}>
      {name}
      <UserCount>{userCount} <PersonIcon /></UserCount>
    </RoomTileContainer>
  );
};

export default RoomTile;