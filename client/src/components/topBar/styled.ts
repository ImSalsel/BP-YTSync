import { styled } from "styled-components";

export const TopBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgb(18, 18, 19);
  color: white;
  font-size: 16px;
  z-index: 1000;
`;

export const HomeButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

export const RoomName = styled.div`
  font-size: 18px;
  margin-left: 10px;
`;

export const UserCount = styled.div`
  font-size: 16px;
  margin-left: 100px;
`;