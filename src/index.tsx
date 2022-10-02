import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import { NotificationProvider } from './contexts/notifications';
import QueryProvider from './contexts/queryClient';
import { AlignmentProvider } from './contexts/alignment';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { SessionProvider } from './contexts/session';
import AuthProvider from './contexts/auth';
import { getAppSetting } from './getAppSetting';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { getAppVersion, isDevMode } from './helpers/getAppVersion';

const sentryDsn = getAppSetting('REACT_APP_SENTRY_DSN');
const [, origin] = window.location.origin.split('://');
const commitHash = getAppSetting('REACT_APP_GIT_COMMIT_HASH');
const appVersion = getAppVersion(commitHash, isDevMode);

console.log('DSN:', sentryDsn);
Sentry.init({
  dsn: sentryDsn,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.1,
  environment: origin,
  release: appVersion,
});

// .env.development Allows you to hide devtools
const showRQTools = getAppSetting('REACT_APP_SHOW_RQ_TOOLS');

ReactDOM.render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <NotificationProvider>
          {showRQTools && <ReactQueryDevtools initialIsOpen={false} />}
          <SessionProvider>
            <AlignmentProvider>
              <QuestionsProvider>
                <ResponsesProvider>
                  <App />
                </ResponsesProvider>
              </QuestionsProvider>
            </AlignmentProvider>
          </SessionProvider>
        </NotificationProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
