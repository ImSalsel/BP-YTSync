import { styled } from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  align-items: space-between;
  justify-content: center;
  background-color: rgb(31, 29, 32);
`;


export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5%;
  width: 80%;
  height: 80%;
  border-radius: 24px;
  align-items: space-between;
  justify-content: center;
  gap: 10%;
  background-color: rgb(18, 18, 19);
`;

export const RoomButton = styled.button`
    padding: 10px;
    margin: 20px;
  width: 500px;
    height: 90%;
  background-color: rgb(50, 50, 50);
  color: white;
  font-size: 2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;


  &:hover {
    background-color: rgb(70, 70, 70);
  }
`;