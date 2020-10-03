import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import './common/styles/global.scss';
import Router from './components/Router/Router';
import CMTheme from './common/styles/CMTheme';

const App = () => {
  return (
    <MuiThemeProvider theme={CMTheme}>
      <Router />
    </MuiThemeProvider>
  );
};

export default App;
