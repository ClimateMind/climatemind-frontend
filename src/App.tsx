import React from 'react';
import CMContainer from './components/Container';
import Home from './pages/home';
import './common/styles/global.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const CMTheme = createMuiTheme({
  typography: {
    fontFamily: 'atten-round-new, sans-serif'
  }
});

function App() {
  return (
    <MuiThemeProvider theme={CMTheme}>
      <CMContainer bgColor="#39F5AD">
        <Home />
      </CMContainer>
    </MuiThemeProvider>
  );
}

export default App;