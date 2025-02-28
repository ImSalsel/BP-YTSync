import { styled } from "styled-components";

export const RoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(31, 29, 32);
  display: grid; 
  grid-template-columns: 10% 65% 25%; 
  grid-template-rows: 20% 50% 30%; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". Search ."
    ". YTvideo ."
    ". botQ ."; 

    .video { grid-area: YTvideo; }
    .bottom { grid-area: botQ; }
    .search { grid-area: Search; }
`;

export const VideoPlayer = styled.div`
  grid-area: YTvideo;
  width: 100%;
  height: 100%;
  background-color: rgb(18, 18, 19);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchBar = styled.input`
  grid-area: Search;
  width: 80%;
  height: 20%;
  margin: auto;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
`;


