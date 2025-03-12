import React, { useState, useEffect } from 'react';
import { HomeContainer, RoomTile, RoomsContainer, AddRoomTile, Modal, ModalContent, CloseButton, CreateRoomForm, CreateRoomInput, CreateRoomButton, RoomTitle } from './styled';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config';
import homeIcon from '../../assets/homeIcon.svg';
import PixelTransition from '../../components/pixelTransition/PixelTransition';
import DecryptedText from '../../components/decryptedText/DecryptedText';
import Particles from '../../components/particles/Particles';
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


  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={false}
    alphaParticles={false}
    disableRotation={false}
  />


      <PixelTransition
  firstContent={
    <img
      src={homeIcon}
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={    <div
    style={{
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
      backgroundColor: "rgb(18, 18, 19)"
    }}
  >
    <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>uWu</p>
  </div>
}
  gridSize={12}
  pixelColor='rgb(18, 18, 19)'
  animationStepDuration={0.4}
/>
      <RoomTitle><DecryptedText
  text="SalselDJ"
  animateOn="view"
  revealDirection="center"
/></RoomTitle>
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