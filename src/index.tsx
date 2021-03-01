import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { PersonalityProvider } from './contexts/personality';
import { SessionProvider } from './contexts/session';
import QueryProvider from './contexts/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from 'react-auth-kit';

// .env.development Allows you to hide devtools
const showRQTools = process.env.REACT_APP_SHOW_RQ_TOOLS === 'true';

ReactDOM.render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider
        authStorageType={'cookie'}
        authStorageName={'_auth_t'}
        authTimeStorageName={'_auth_time'}
        stateStorageName={'_auth_state'}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === 'https:'}
        refreshTokenName={'_refresh_t'}
      >
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
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
