import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';

import QueryProvider from './contexts/queryClient';
import { AlignmentProvider } from './contexts/alignment';

import './global.css';
import router from './router/Router';
import { ToastProvider } from 'shared/contexts';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <QueryProvider>
            <ToastProvider>
              <AlignmentProvider>
                <RouterProvider router={router} />
              </AlignmentProvider>
            </ToastProvider>
          </QueryProvider>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default Sentry.withProfiler(App);
