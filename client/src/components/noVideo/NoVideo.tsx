import React from 'react';
import DecryptedText from '../decryptedText/DecryptedText';
import { NoVideoContainer } from './styled';



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