import React from 'react';
import { RouterProvider } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import './common/styles/global.css';
import router from './router/Router';

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Sentry.withProfiler(App);
