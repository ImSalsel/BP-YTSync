import { styled } from "styled-components";



export const VolumeSlider = styled.input`
  position: absolute;
  bottom: 80px; 
  left: 50%;
  transform: translateX(-50%) rotate(270deg);
  width: 100px;
  display: none; 
`;

export const VolumeControlWrapper = styled.div`
  position: relative;
  width: 60px; 
  height: 160px; 
  &:hover ${VolumeSlider} {
    display: block;
  }
  margin-bottom: 120px; 
  display: inline-block;
`;


export const VolumeIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  &:hover {
    color:rgb(22, 82, 143); 
  }
`;