import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { PersonalityProvider } from './contexts/personality';
import { SessionProvider } from './contexts/session';
import QueryProvider from './contexts/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
    <QueryProvider>
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
  </React.StrictMode>,
  document.getElementById('root')
);
