import { styled } from "styled-components";

export const TopBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding-top: 5px;
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

  img {
    width: 48px; // Adjust the width as needed
    height: 48px; // Adjust the height as needed
  }
`;

export const RoomName = styled.div`
  font-size: 18px;
  margin-left: 10px;
`;

export const UserCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-left: 100px;
  svg {
    margin-left: 5px;
  }
`;