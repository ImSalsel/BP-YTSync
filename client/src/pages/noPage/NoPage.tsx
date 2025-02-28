import React from 'react';
import { HomeContainer, RoomsContainer } from './styled';

const NoPage: React.FC = () => {

  return (
        <HomeContainer>

            <RoomsContainer>

                <h1>404 - Page Not Found</h1>

            </RoomsContainer>

        </HomeContainer>
  );
};

export default NoPage;