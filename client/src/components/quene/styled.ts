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
  overflow-y: auto;
`;

export const Song = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 10px;
  margin: 5px 0;
  background-color: #2a2a2a;
  border-radius: 5px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
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