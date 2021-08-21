import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import { NotificationProvider } from './contexts/notifications';
import { PersonalityProvider } from './contexts/personality';
import QueryProvider from './contexts/queryClient';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { SessionProvider } from './contexts/session';
import AuthProvider from './contexts/auth';
import { getAppSetting } from './getAppSetting';
import LogRocket from 'logrocket';

// .env.development Allows you to hide devtools
const showRQTools = getAppSetting('REACT_APP_SHOW_RQ_TOOLS');
const IN_DEV = process.env.NODE_ENV === 'development';

// Don't run in development environment as the free plan only supports limited sessions
if (!IN_DEV) {
  LogRocket.init('4e1gkx/climatemind');
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <QueryProvider>
          {showRQTools && <ReactQueryDevtools initialIsOpen={false} />}
          <SessionProvider>
            <QuestionsProvider>
              <ResponsesProvider>
                <PersonalityProvider>
                  <App />
                </PersonalityProvider>
              </ResponsesProvider>
            </QuestionsProvider>
          </SessionProvider>
        </QueryProvider>
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
