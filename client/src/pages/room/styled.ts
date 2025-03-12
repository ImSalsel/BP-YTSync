import { styled } from "styled-components";

export const RoomContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(31, 29, 32);
  display: grid; 
  grid-template-columns: 5% 65% 25%; 
  grid-template-rows: 23% 60% 15%; 
  gap: 0px 2%; 
  grid-template-areas: 
    ". Search ."
    ". YTvideo Queue"
    ". title ."; 

    .video { grid-area: YTvideo; }
    .title { grid-area: title; }
    .search { grid-area: Search; }
    .queue { grid-area: Queue; }
`;



export const QueueContainer = styled.div`
  grid-area: Queue;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoPlayer = styled.div`
  grid-area: YTvideo;
  width: 100%;
  height: 100%;
  background-color: rgb(18, 18, 19);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  position: relative;

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
  border-radius: 24px;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0); /* Transparent background */
  z-index: 1; /* Ensure the overlay is above the video player */
`;