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

// .env.development Allows you to hide devtools
const showRQTools = process.env.REACT_APP_SHOW_RQ_TOOLS === 'true';

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);
