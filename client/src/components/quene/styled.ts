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

