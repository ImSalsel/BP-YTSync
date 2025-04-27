import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';
import { useWebSocket } from '../../context/WebSocketContext';
import { Room } from './types';



const useHome = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectToRoom, setRedirectToRoom] = useState<string | null>(null);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const { socket } = useWebSocket();


  useEffect(() => {
    if (!socket) return;

    socket.on('roomListUpdated', (updatedRooms: Room[]) => {
      setRooms(updatedRooms);
    });

    socket.on('userCountUpdated', (roomId: string, count: number) => {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.name === roomId ? { ...room, userCount: count } : room
        )
      );
    });

    socket.emit('getRoomList');

    return () => {
      socket.off('roomListUpdated');
      socket.off('userCountUpdated');
    };
  }, [socket]);

  const handleCreateRoom = (roomName: string, isPublic: boolean, userLimit: number | null) => {
    if (socket) {
      const creatorId = Cookies.get('userId');
      if (creatorId !== undefined) {
        socket.emit('createRoom', roomName, isPublic, userLimit, creatorId);
        socket.on('roomListUpdated', (updatedRooms: Room[]) => {
          setRooms(updatedRooms);
          navigate(`/room/${roomName}`);
        });
      }
      else {
        setIsLoginModalOpen(true);
        
      }

    }
  };

  const handleRoomClick = (roomName: string, isPublic: boolean) => {
    const userId = Cookies.get('userId');
    if (!userId) {
      setRedirectToRoom(roomName);
      setIsLoginModalOpen(true);
      return;
    }
  
    if (isPublic) {
      navigate(`/room/${roomName}`);
      socket?.emit('joinRoom', roomName); // Emit joinRoom directly for public rooms
    } else {
      const code = prompt('Enter the code to join this private room:');
      if (code) {
        socket?.emit('verifyRoomCode', roomName, code, (response: { success: boolean; error?: string }) => {
          if (response.success) {
            navigate(`/room/${roomName}`);
            socket?.emit('joinRoom', roomName); // Emit joinRoom after successful verification
          } else {
            alert(response.error || 'Failed to verify the room code');
          }
        });
      }
    }
  };

  const openModal = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setRedirectToRoom(null);
  };

  const onLoginSuccess = () => {
    login();
    setIsLoginModalOpen(false);
    if (redirectToRoom) {
      navigate(`/room/${redirectToRoom}`);
      setRedirectToRoom(null);
    } else {
      setIsModalOpen(true);
    }
  };

  const particlesProps = useMemo(
    () => ({
      particleColors: ['#ffffff', '#ffffff'],
      particleCount: 200,
      particleSpread: 10,
      speed: 0.1,
      particleBaseSize: 100,
      moveParticlesOnHover: false,
      alphaParticles: false,
      disableRotation: false,
    }),
    []
  );

  return {
    rooms,
    isModalOpen,
    isLoginModalOpen,
    particlesProps,
    handleCreateRoom,
    handleRoomClick,
    openModal,
    closeModal,
    closeLoginModal,
    onLoginSuccess,
  };
};

export default useHome;