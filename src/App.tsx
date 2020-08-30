import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import './common/styles/global.scss';
import Home from './pages/Home';
import Welcome from './pages/Welcome';

const CMTheme = createMuiTheme({
  typography: {
    fontFamily: 'atten-round-new, sans-serif',
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={CMTheme}>
      {/* <Home /> */}
      <Welcome />
    </MuiThemeProvider>
  );
};

export default App;
