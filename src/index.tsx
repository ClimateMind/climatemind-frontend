import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { PersonalityProvider } from './contexts/personality';
import { SessionProvider } from './contexts/session';
import QueryProvider from './contexts/queryClient';

ReactDOM.render(
  <React.StrictMode>
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
