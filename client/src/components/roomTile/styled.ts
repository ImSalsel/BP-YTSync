import { styled } from "styled-components";
import { HTMLAttributes } from 'react';

interface TestCyProps extends HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

export const RoomTileContainer = styled.div.attrs<TestCyProps>(() => ({
  'data-testid': 'room-tile', 
}))`
  background-color: rgb(18, 18, 19);
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
  font-size: 1rem;
  position: relative;
  

  &:hover {
    background-color: #0056b3;
  }
`;

export const UserCount = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;

  margin-left: 100px;
  svg {
    margin-left: 5px;
  }
`;

export const LockIconContainer = styled.div`
  position: absolute;
  top: 3%;
  left: 3%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

