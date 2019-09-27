import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`  
  *,
  *::after,
  *::before{
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Work Sans', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    font-size: 15px;
  }   
`;
