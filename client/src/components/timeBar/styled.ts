import styled, { keyframes } from 'styled-components';

export const TimeBarContainer = styled.div`
  width: 50%;
  height: 30px;
  background-color: transparent;
  position: relative;
  margin-top: 10px;
`;


export const ProgressBar = styled.div`
  height: 13%;
  background-color:rgb(30, 45, 200); /* White color for the progress bar */
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px; /* Rounded corners */
`;

export const ProgressIndicator = styled.div`
  width: 10px;
  height: 20px;
  background-color: rgb(30, 45, 200); /* White color for the indicator */
  position: absolute;
  top: 2%;
  transform: translateY(-50%);
  border-radius: 2px; /* Rounded corners */
`;

export const ProgressBarFull = styled.div`
  height: 10%;
  width: 100%;
  background-color: #333; /* White color for the progress bar */
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px; /* Rounded corners */
  z-index: 0;
`;

export const TimeText = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 65%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #333;
`;

const zap = keyframes`
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(5px);
  }
  100% {
    opacity: 0;
    transform: translateX(10px);
  }
`;

export const ZapEffect = styled.div`
  width: 10px;
  height: 10px;
  background-color: yellow; /* Color for the zapping effect */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%; /* Make it a circle */
  animation: ${zap} 0.5s infinite; /* Adjust the duration as needed */
  z-index: 10;
`;