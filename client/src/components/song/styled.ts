import { styled } from "styled-components";

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

export const VoteButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const VoteItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    transform: scale(1.1);
  }

  span {
    margin-left: 5px;
  }
`;