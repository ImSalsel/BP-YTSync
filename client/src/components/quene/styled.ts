import { styled } from "styled-components";

export const QueueContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: rgb(18, 18, 19);
  padding: 10px;
  overflow-y: auto;
  border-radius: 24px;
`;

export const Song = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  padding: 10px;
  margin: 5px 0;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(50, 50, 50);
  color: white;
  border-radius: 12px;
`;