import React from 'react';
import { HomeContainer, RoomsContainer, AddRoomTile, RoomTitle } from './styled';
import Particles from '../../components/particles/Particles';
import PixelTransition from '../../components/pixelTransition/PixelTransition';
import DecryptedText from '../../components/decryptedText/DecryptedText';
import RoomTile from '../../components/roomTile/RoomTile';
import LoginModal from '../../components/loginModal/LoginModal';
import CreateRoomModal from '../../components/createRoomModal/CreateRoomModal';
import GoogleLoginButton from '../../components/googleLoginButton/GoogleLoginButton';
import useHome from './useHome';
import homeIcon from '../../assets/homeIcon.svg';

const Home: React.FC = () => {
  const {
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
  } = useHome();

  return (
    <HomeContainer>
      <Particles {...particlesProps} />
      <PixelTransition
        firstContent={
          <img
            src={homeIcon}
            alt="default pixel transition content, a cat!"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        }
        secondContent={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              backgroundColor: 'rgb(18, 18, 19)',
            }}
          >
            <p style={{ fontWeight: 900, fontSize: '3rem', color: '#ffffff' }}>uWu</p>
          </div>
        }
        gridSize={12}
        pixelColor="rgb(18, 18, 19)"
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
        {rooms.map((room) => (
          <RoomTile
            key={room.name}
            name={room.name}
            userCount={room.userCount}
            onClick={() => handleRoomClick(room.name, room.isPublic)}
            isPublic={room.isPublic}
          />
        ))}
        <AddRoomTile onClick={openModal}>+ Add Room</AddRoomTile>
      </RoomsContainer>
      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateRoom={handleCreateRoom}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <GoogleLoginButton onSuccess={onLoginSuccess} />
      </LoginModal>
    </HomeContainer>
  );
};

export default Home;