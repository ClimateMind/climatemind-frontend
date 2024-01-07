import React from 'react';
import { RouterProvider } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import { ReactQueryDevtools } from 'react-query/devtools';
import QueryProvider from './contexts/queryClient';
import { AlignmentProvider } from './contexts/alignment';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { SessionProvider } from './contexts/session';
import AuthProvider from './contexts/auth';

import './common/styles/global.css';
import router from './router/Router';
import { getAppSetting } from 'getAppSetting';
import { ToastProvider } from 'shared/contexts';
import { Provider } from 'react-redux';
import { store } from 'store/store';

const App = () => {
  // .env.development Allows you to hide devtools
  const showRQTools = getAppSetting('REACT_APP_SHOW_RQ_TOOLS');

  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryProvider>
          <ToastProvider>
            <AuthProvider>
                {showRQTools && <ReactQueryDevtools initialIsOpen={false} />}
                <SessionProvider>
                  <AlignmentProvider>
                    <QuestionsProvider>
                      <ResponsesProvider>
                        <RouterProvider router={router} />
                      </ResponsesProvider>
                    </QuestionsProvider>
                  </AlignmentProvider>
                </SessionProvider>
            </AuthProvider>
          </ToastProvider>
        </QueryProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default Sentry.withProfiler(App);
