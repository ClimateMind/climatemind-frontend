import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';

import './global.css';
import router from './router/Router';
import { ToastProvider } from 'shared/contexts';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const queryClient = new QueryClient();

const App = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </QueryClientProvider>
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
};

export default Sentry.withProfiler(App);
