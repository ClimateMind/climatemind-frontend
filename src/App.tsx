import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CMTheme from './common/styles/CMTheme';
import Router from './components/Router/Router';
import { useMockServiceWorker } from './mocks/useMSW';

const tagManagerArgs = {
  gtmId: 'GTM-56GRWXW',
  dataLayer: {
    userId: '001',
    userProject: 'Climate Mind App',
  },
};

TagManager.initialize(tagManagerArgs);
const inDev = process.env.NODE_ENV === 'development';

const App = () => {
  // Start mock service worker if mocking is configer on on the /dev menu
  const { useMSW, worker } = useMockServiceWorker();
  inDev && useMSW && worker.start();

  useEffect(() => {
    if (useMSW === false) {
      console.log('Mocking is disabled');
    }
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          {/* Adding mui icons form google fonts for more icons */}
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Helmet>
        <MuiThemeProvider theme={CMTheme}>
          <CssBaseline />
          <Router />
        </MuiThemeProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
