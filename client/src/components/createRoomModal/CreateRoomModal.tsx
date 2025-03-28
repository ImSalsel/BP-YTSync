import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  CreateRoomForm,
  CreateRoomInput,
  CreateRoomButton,
  CloseButton,
  ButtonContainer,
} from './styled';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (roomName: string) => void; // Pass the room name to the parent
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, onCreateRoom }) => {
  const [newRoom, setNewRoom] = useState('');

  const sanitizeInput = (input: string) => {
    return input.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove special characters
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedRoomName = sanitizeInput(newRoom.trim());
    if (sanitizedRoomName) {
      onCreateRoom(sanitizedRoomName); // Pass the sanitized room name to the parent
      setNewRoom(''); // Clear the input field
      onClose(); // Close the modal
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
            maxLength={20} // Set character limit
          />
          <ButtonContainer>
            <CreateRoomButton type="submit">Create Room</CreateRoomButton>
            <CloseButton type="button" onClick={onClose}>Cancel</CloseButton>
          </ButtonContainer>
        </CreateRoomForm>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;