import React, { useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import './common/styles/global.scss';
import Router from './components/Router/Router';
import CMTheme from './common/styles/CMTheme';
import { useSession } from './hooks/useSession';

const App = () => {
  return (
    <MuiThemeProvider theme={CMTheme}>
      <Router />
    </MuiThemeProvider>
  );
};

export default App;
