import { styled } from "styled-components";
import { HTMLAttributes } from 'react';

interface TestCyProps extends HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}
export const Modal = styled.div.attrs<TestCyProps>(() => ({
  'data-testid': 'create-room-modal', 
}))`
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

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
`;

export const ToggleInput = styled.input`
  margin-right: 5px;
`;



export const UserLimitInput = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;