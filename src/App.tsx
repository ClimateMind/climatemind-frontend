import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import './common/styles/global.scss';
import '@material/react-material-icon/dist/material-icon.css';
import Router from './components/Router/Router';
import CMTheme from './common/styles/CMTheme';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import * as Sentry from '@sentry/react';

const App = () => {
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
