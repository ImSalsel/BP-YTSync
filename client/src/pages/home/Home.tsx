import React from 'react';
import { HomeContainer, RoomButton, RoomsContainer } from './styled';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <HomeContainer>
    <RoomsContainer>
      <Link to="/room/1">
        <RoomButton>Room 1</RoomButton>
      </Link>
      <Link to="/room/2">
        <RoomButton>Room 2</RoomButton>
      </Link>
    </RoomsContainer>
  </HomeContainer>
  );
};

export default Home;