import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { PersonalityProvider } from './contexts/personality';
import { SessionProvider } from './contexts/session';

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <QuestionsProvider>
        <ResponsesProvider>
          <PersonalityProvider>
            <App />
          </PersonalityProvider>
        </ResponsesProvider>
      </QuestionsProvider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
