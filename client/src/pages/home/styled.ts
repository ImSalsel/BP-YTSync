import { Link } from 'react-router-dom';
import styled from 'styled-components';

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


export const AddRoomTile = styled.div`
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

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const ModalContent = styled.div`
  background-color: rgb(31, 29, 32); 
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  color: white; 
  font-family: 'Orbitron' ;
`;

export const CloseButton = styled.button`
  background-color:rgb(214, 46, 55);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;

export const CreateRoomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const CreateRoomInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: rgb(18, 18, 19); 
  color: white; 
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const CreateRoomButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

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

