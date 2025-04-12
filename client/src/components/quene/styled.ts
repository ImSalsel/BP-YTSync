import styled from 'styled-components';

export const QueueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgb(18, 18, 19);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;

 scrollbar-width: auto; 
 scrollbar-color: #555 #2a2a2a; 

  &::-webkit-scrollbar {
    width: 10px; 
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a; 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #555; 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #777; 
  }
`;

export const Song = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 4%;
  margin: 5px 0;
  background-color: #2a2a2a;
  border-radius: 8px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  div {
    flex: 1;
    text-align: left;
  }

  button {
    background-color: #333;
    color: #fff;
    border: solid white;
    border-width: 1px;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-family: 'Orbitron', sans-serif;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2a2a2a;
    }
  }
`;

export const Thumbnail = styled.img`
  width: 20%;
  border-radius: 8px;
  margin-right: 10px;
`;

export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;

  div {
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowing text */
    text-overflow: ellipsis; /* Add ellipsis to truncated text */
  }
`;