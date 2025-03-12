import React, { useState, useEffect } from 'react';
import { HomeContainer, RoomTile, RoomsContainer, AddRoomTile, Modal, ModalContent, CloseButton, CreateRoomForm, CreateRoomInput, CreateRoomButton } from './styled';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config';

const Home: React.FC = () => {
  const [newRoom, setNewRoom] = useState('');
  const [rooms, setRooms] = useState<{ name: string, userCount: number }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(config.SOCKET_ADDRESS, {
      transports: ["websocket", "polling"],
      withCredentials: true
  });
  
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  socket.on('disconnect', (reason) => {
    console.warn('Disconnected from server:', reason);
  });

    socket.on('roomListUpdated', (updatedRooms: { name: string, userCount: number }[]) => {
      setRooms(updatedRooms);
    });

    socket.on('userCountUpdated', (roomId: string, count: number) => {
      setRooms(prevRooms => prevRooms.map(room => room.name === roomId ? { ...room, userCount: count } : room));
    });

    // Request the initial room list
    socket.emit('getRoomList');

    return () => {
      socket.close();
    };
  }, []);

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newRoom.trim()) {
      const roomName = newRoom.trim();
      const socket = io(config.SOCKET_ADDRESS);
      socket.emit('createRoom', roomName);
      socket.on('roomListUpdated', (updatedRooms: { name: string, userCount: number }[]) => {
        setRooms(updatedRooms);
        navigate(`/room/${roomName}`);
      });
      setNewRoom('');
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HomeContainer>
      <RoomsContainer>
        {rooms.map(room => (
          <Link key={room.name} to={`/room/${room.name}`}>
            <RoomTile>
              {room.name} ({room.userCount} users)
            </RoomTile>
          </Link>
        ))}
        <AddRoomTile onClick={openModal}>+ Add Room</AddRoomTile>
      </RoomsContainer>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <CreateRoomForm onSubmit={handleCreateRoom}>
              <CreateRoomInput
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                placeholder="Enter room name"
              />
              <CreateRoomButton type="submit">Create Room</CreateRoomButton>
            </CreateRoomForm>
          </ModalContent>
        </Modal>
      )}
    </HomeContainer>
  );
};

export default Home;