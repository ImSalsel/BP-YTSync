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
  flex-direction: row;
  margin-top: 0%;
  width: 80%;
  height: 40%;
  border-radius: 24px;
  align-items: space-between;
  gap: 20px;
  background-color: rgb(31, 29, 32);
  padding: 20px;
  z-index: 1;
`;

export const RoomTile = styled.div`
  background-color: rgb(18, 18, 19);
  color: white;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  width: 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AddRoomTile = styled(RoomTile)`
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;

`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
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
  width: 250px; /* Adjust the size as needed */
  height: 250px; /* Adjust the size as needed */
  margin-top: 5%;
`;

export const RoomTitle = styled.div`
  font-size: 42px;
  margin-bottom: 20px;
  color: white;
  z-index: 1;
`;

