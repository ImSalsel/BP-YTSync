import { RoomTileContainer, UserCount } from "./styled";
import PersonIcon from '@mui/icons-material/Person';

interface RoomTileProps {
    name: string;
    userCount: number;
}


const RoomTile: React.FC<RoomTileProps> = ({name, userCount}) => {
  return (
    <RoomTileContainer>
        {name} 
        <UserCount>{userCount} <PersonIcon /></UserCount>

    </RoomTileContainer>
  );
};

export default RoomTile;