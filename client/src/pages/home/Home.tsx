import React from 'react';
import { HomeContainer, RoomButton, RoomsContainer } from './styled';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <HomeContainer>
    <RoomsContainer>
      <Link to="/room/test">
        <RoomButton>test</RoomButton>
      </Link>
      <Link to="/room/music">
        <RoomButton>music</RoomButton>
      </Link>
    </RoomsContainer>
  </HomeContainer>
  );
};

export default Home;