import React from 'react';
import styled from 'styled-components';

const NoVideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 1.5rem;
  background-color: rgb(18, 18, 19);
`;

const NoVideo: React.FC = () => {
  return (
    <NoVideoContainer>
      No video in the queue
    </NoVideoContainer>
  );
};

export default NoVideo;