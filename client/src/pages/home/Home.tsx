import React, { useState, useEffect, useMemo } from 'react';
import { HomeContainer, RoomsContainer, AddRoomTile, Modal, ModalContent, CloseButton, CreateRoomForm, CreateRoomInput, CreateRoomButton, RoomTitle, ButtonContainer } from './styled';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import config from '../../config';
import homeIcon from '../../assets/homeIcon.svg';
import PixelTransition from '../../components/pixelTransition/PixelTransition';
import DecryptedText from '../../components/decryptedText/DecryptedText';
import Particles from '../../components/particles/Particles';
import RoomTile from '../../components/roomTile/RoomTile';


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

  const sanitizeInput = (input: string) => {
    return input.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove special characters
  };

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedRoomName = sanitizeInput(newRoom.trim());
    if (sanitizedRoomName) {
      const socket = io(config.SOCKET_ADDRESS);
      socket.emit('createRoom', sanitizedRoomName);
      socket.on('roomListUpdated', (updatedRooms: { name: string, userCount: number }[]) => {
        setRooms(updatedRooms);
        navigate(`/room/${sanitizedRoomName}`);
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
    setNewRoom('');
  };

  const particlesProps = useMemo(() => ({
    particleColors: ['#ffffff', '#ffffff'],
    particleCount: 200,
    particleSpread: 10,
    speed: 0.1,
    particleBaseSize: 100,
    moveParticlesOnHover: false,
    alphaParticles: false,
    disableRotation: false,
  }), []);

  return (
    <HomeContainer>
      <Particles {...particlesProps} />
      <PixelTransition
        firstContent={
          <img
            src={homeIcon}
            alt="default pixel transition content, a cat!"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        secondContent={
          <div
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
      <RoomTitle>
        <DecryptedText
          text="SalselDJ"
          animateOn="view"
          revealDirection="center"
        />
      </RoomTitle>
      <RoomsContainer>
        {rooms.map(room => (
          <Link key={room.name} to={`/room/${room.name}`}>
            <RoomTile name={room.name} userCount={room.userCount} />
          </Link>
        ))}
        <AddRoomTile onClick={openModal}>+ Add Room</AddRoomTile>
      </RoomsContainer>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CreateRoomForm onSubmit={handleCreateRoom}>
              <CreateRoomInput
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(sanitizeInput(e.target.value))}
                placeholder="Enter room name"
                maxLength={20} // Set character limit
              />
              <ButtonContainer>
                <CreateRoomButton type="submit">Create Room</CreateRoomButton>
                <CloseButton onClick={closeModal}>Cancel</CloseButton>
              </ButtonContainer>
            </CreateRoomForm>
          </ModalContent>
        </Modal>
      )}
    </HomeContainer>
  );
};

export default Home;