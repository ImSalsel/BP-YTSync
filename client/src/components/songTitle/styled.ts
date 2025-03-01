import { styled } from "styled-components";


export const SongTitleContainer = styled.div`
  width: 50%;
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
  font-size: 16px;
  z-index: 1000;
`;

export const VolumeSlider = styled.input`
  width: 100px;
  margin-left: 20px;
`;