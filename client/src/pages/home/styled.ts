import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HTMLAttributes } from 'react';

interface TestCyProps extends HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(18, 18, 19);
`;

export const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: left;
  margin-top: 0%;
  width: 80%;
  height: 40%;
  border-radius: 24px;
  gap: 20px;
  background-color: rgb(31, 29, 32);
  padding: 20px;
  z-index: 1;
  overflow-y: auto;

  @media (max-width: 1000px) {
    width: 90%; 
    padding-left: 5%; 
    padding-right: 5%; 
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
`;




export const AddRoomTile = styled.div.attrs<TestCyProps>(() => ({
  'data-testid': 'add-room-tile', 
}))`
  color: white;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  width: 160px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

export const Logo = styled.img`
  width: 250px; 
  height: 250px; 
  margin-top: 5%;
`;

export const RoomTitle = styled.div`
  font-size: 42px;
  margin-bottom: 20px;
  color: white;
  z-index: 1;
`;

