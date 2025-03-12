import React from 'react';
import styled from 'styled-components';
import DecryptedText from '../decryptedText/DecryptedText';

const NoVideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 1.5rem;
  background-color: rgb(18, 18, 19);
  border-radius: 24px;

`;

const NoVideo: React.FC = () => {
  return (
    <NoVideoContainer>
      <DecryptedText
        speed={100}
        text=" No video in the queue"
        animateOn="view"
        revealDirection="center"
      />
    </NoVideoContainer>
  );
};

export default NoVideo;