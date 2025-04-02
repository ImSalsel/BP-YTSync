import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  CreateRoomForm,
  CreateRoomInput,
  CreateRoomButton,
  CloseButton,
  ButtonContainer,
  ToggleContainer,
  ToggleLabel,
  ToggleInput,
  UserLimitInput,
} from './styled';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (roomName: string, isPublic: boolean, userLimit: number | null) => void; // Pass additional room details to the parent
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, onCreateRoom }) => {
  const [newRoom, setNewRoom] = useState('');
  const [isPublic, setIsPublic] = useState(true); // Default to public room
  const [userLimit, setUserLimit] = useState<number | null>(null);

  const sanitizeInput = (input: string) => {
    return input.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove special characters
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedRoomName = sanitizeInput(newRoom.trim());
    if (sanitizedRoomName) {
      onCreateRoom(sanitizedRoomName, isPublic, userLimit); // Pass room details to the parent
      setNewRoom('');
      setUserLimit(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <CreateRoomForm onSubmit={handleSubmit}>
          <CreateRoomInput
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(sanitizeInput(e.target.value))}
            placeholder="Enter room name"
            maxLength={20}
          />
          <ToggleContainer>
            <ToggleLabel>
              <ToggleInput
                type="radio"
                name="roomType"
                value="public"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />
              Public
            </ToggleLabel>
            <ToggleLabel>
              <ToggleInput
                type="radio"
                name="roomType"
                value="private"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
              />
              Private
            </ToggleLabel>
          </ToggleContainer>
          <UserLimitInput
            type="number"
            value={userLimit || ''}
            onChange={(e) => setUserLimit(Number(e.target.value) || null)}
            placeholder="Enter user limit (optional)"
            min={1}
            max={100}
          />
          <ButtonContainer>
            <CreateRoomButton type="submit">Create Room</CreateRoomButton>
            <CloseButton type="button" onClick={onClose}>
              Cancel
            </CloseButton>
          </ButtonContainer>
        </CreateRoomForm>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;