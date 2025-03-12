import { createGlobalStyle } from 'styled-components';
import '@fontsource/orbitron'; 

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Orbitron', sans-serif;
  }
`;

export default GlobalStyles;