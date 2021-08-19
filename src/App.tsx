import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import './common/styles/global.scss';
import '@material/react-material-icon/dist/material-icon.css';
import Router from './components/Router/Router';
import CMTheme from './common/styles/CMTheme';
import TagManager from 'react-gtm-module';
import { Helmet } from 'react-helmet';

const tagManagerArgs = {
  gtmId: 'GTM-56GRWXW',
  dataLayer: {
    userId: '001',
    userProject: 'Climate Mind App',
  },
};

TagManager.initialize(tagManagerArgs);

const App = () => {
  // Print env variables to the console
  const ENV_VARIABLES = process.env;
  console.log('ENV VARS', ENV_VARIABLES);

  return (
    <>
      <Helmet>
        {/* Adding mui icons form google fonts for more icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Helmet>
      <MuiThemeProvider theme={CMTheme}>
        <Router />
      </MuiThemeProvider>
    </>
  );
};

export default App;
