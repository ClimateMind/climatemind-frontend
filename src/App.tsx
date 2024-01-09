import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';

import QueryProvider from './contexts/queryClient';
import { AlignmentProvider } from './contexts/alignment';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';

import './common/styles/global.css';
import router from './router/Router';
import { ToastProvider } from 'shared/contexts';
import { Provider } from 'react-redux';
import { store } from 'store/store';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <QueryProvider>
            <ToastProvider>
              <AlignmentProvider>
                <QuestionsProvider>
                  <ResponsesProvider>
                    <RouterProvider router={router} />
                  </ResponsesProvider>
                </QuestionsProvider>
              </AlignmentProvider>
            </ToastProvider>
          </QueryProvider>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default Sentry.withProfiler(App);
