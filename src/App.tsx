import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import './common/styles/global.scss';
import Router from './components/Router/Router';
import CMTheme from './common/styles/CMTheme';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-56GRWXW',
  dataLayer: {
    userId: '001',
    userProject: 'Climate Mind App',
  },
};

TagManager.initialize(tagManagerArgs);

const App = () => {
  return (
    <MuiThemeProvider theme={CMTheme}>
      <Router />
    </MuiThemeProvider>
  );
};

export default App;
