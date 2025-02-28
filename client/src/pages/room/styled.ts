import { styled } from "styled-components";

export const RoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(31, 29, 32);
  display: grid; 
  grid-template-columns: 10% 65% 25%; 
  grid-template-rows: 20% 65% 15%; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". Search ."
    ". YTvideo Queue"
    ". title ."; 

    .video { grid-area: YTvideo; }
    .bottom { grid-area: title; }
    .search { grid-area: Search; }
    .queue { grid-area: Queue; }
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

export const SearchForm = styled.form`
  grid-area: Search;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchBar = styled.input`
  width: 80%;
  height: 30%;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
`;
