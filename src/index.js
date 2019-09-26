import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './utils/theme.js';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './utils/globalStyles';
import 'normalize.css';
import 'flexboxgrid2/flexboxgrid2.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <>
        <App />
        <GlobalStyles />
      </>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
