import styled from 'styled-components';

export const TimeBarContainer = styled.div`
  width: 100%;
  height: 30px;
  background-color: #e0e0e0;
  position: relative;
  margin-top: 10px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #007bff;
  position: absolute;
  top: 0;
  left: 0;
`;

export const TimeText = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #333;
`;