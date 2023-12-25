import React from 'react';
import { RouterProvider } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { MuiThemeProvider } from '@material-ui/core';

import './common/styles/global.scss';
import '@material/react-material-icon/dist/material-icon.css';
import CMTheme from './common/styles/CMTheme';
import router from './router/Router';

const App = () => {
  return (
    <MuiThemeProvider theme={CMTheme}>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  );
};

export default Sentry.withProfiler(App);
