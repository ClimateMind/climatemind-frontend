import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import './common/styles/global.scss';
import Home from './pages/Home';
import Router from './components/Router';
// import Welcome from './pages/QuizWelcome';

const CMTheme = createMuiTheme({
  typography: {
    fontFamily: 'atten-round-new, sans-serif',
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={CMTheme}>
      <Router />
    </MuiThemeProvider>
  );
};

export default App;
