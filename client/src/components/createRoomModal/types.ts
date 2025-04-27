export interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (roomName: string, isPublic: boolean, userLimit: number | null) => void; // Pass additional room details to the parent
}