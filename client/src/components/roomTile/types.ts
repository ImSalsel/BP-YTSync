export interface RoomTileProps {
  name: string;
  userCount: number;
  isPublic: boolean;
  onClick: () => void;
}