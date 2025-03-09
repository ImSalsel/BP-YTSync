import { styled } from "styled-components";


export const SongTitleContainer = styled.div`
  width: 55%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: rgb(18, 18, 19);
  border-radius: 24px;
  margin-top: 5%;
  position: fixed;
  bottom: 0;
  left: 10%;
  padding: 10px;
  color: white;
  gap: 10px;

`;

export const SongTitleText = styled.div`
  width: 50%;
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
`;