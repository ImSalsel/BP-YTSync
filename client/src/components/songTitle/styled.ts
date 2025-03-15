import { keyframes, styled } from "styled-components";

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

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
  font-size: 20px;

  @media (max-width: 1000px) {
    width: 80%; 
    left: 0%;
    margin-left: 10%;
  }
`;

export const SongTitleText = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const ScrollingText = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${scroll} 10s linear infinite;
`;

export const StaticText = styled.div`
  display: inline-block;
  white-space: nowrap;
`;