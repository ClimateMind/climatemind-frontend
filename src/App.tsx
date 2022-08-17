import React, { useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import './common/styles/global.scss';
import '@material/react-material-icon/dist/material-icon.css';
import Router from './components/Router/Router';
import CMTheme from './common/styles/CMTheme';
import TagManager from 'react-gtm-module';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useMockServiceWorker } from './mocks/useMSW';
import * as Sentry from '@sentry/react';

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
          <Router />
        </MuiThemeProvider>
      </HelmetProvider>
    </>
  );
};

export default Sentry.withProfiler(App);
