import React from 'react';
import { RouterProvider } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { MuiThemeProvider } from '@material-ui/core';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import './common/styles/global.scss';
import '@material/react-material-icon/dist/material-icon.css';
import CMTheme from './common/styles/CMTheme';
import router from './router/Router';

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
          <RouterProvider router={router} />
        </MuiThemeProvider>
      </HelmetProvider>
    </>
  );
};

export default Sentry.withProfiler(App);
