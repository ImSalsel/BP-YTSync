import { styled } from "styled-components";
import { HTMLAttributes } from 'react';

interface TestCyProps extends HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

export const RoomContainer = styled.div.attrs<TestCyProps>(() => ({
  'data-testid': 'room-container', 
}))`
  width: 100vw;
  height: 100vh;
  background-color: rgb(31, 29, 32);
  display: grid; 
  grid-template-columns: 5% 60% 30%; 
  grid-template-rows: 25% 60% 15%; 
  gap: 0px 2%; 
  grid-template-areas: 
    ". Search ."
    ". YTvideo Queue"
    ". title ."; 

    .video { grid-area: YTvideo; }
    .title { grid-area: title; }
    .search { grid-area: Search; }
    .queue { grid-area: Queue; }

    @media (max-width: 1000px) {
      grid-template-areas:
    'YTvideo'
    'Queue'
    'Search';
  grid-template-rows: 40% 40% 20%;
  grid-template-columns: 100%;
  gap: 10px 0%;
  }

`;



export const QueueContainer = styled.div.attrs<TestCyProps>(() => ({
  'data-testid': 'queue-container', 
}))`
  grid-area: Queue;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    width: 100%; 
    margin-right: 0%;
    
  }
`;

export const VideoPlayer = styled.div.attrs<TestCyProps>(() => ({
  'data-testid': 'video-player', 
}))`
  grid-area: YTvideo;
  width: 100%;
  height: 100%;
  background-color: rgb(18, 18, 19);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  position: relative;

  @media (max-width: 1000px) {
    width: 100%; 

  }

`;

export const SearchForm = styled.form`
  grid-area: Search;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; 
  top: 40px; 
`;
export const SearchBar = styled.input`
  background-color: rgb(18, 18, 19);
  width: 80%;
  height: 25%;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 24px;
  color: white;
  outline: none;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0); 
  z-index: 1; 
`;