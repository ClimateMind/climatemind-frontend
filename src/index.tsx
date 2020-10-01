import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { PersonalityProvider } from './contexts/personality';

ReactDOM.render(
  <React.StrictMode>
    <QuestionsProvider>
      <ResponsesProvider>
        <PersonalityProvider>
          <App />
        </PersonalityProvider>
      </ResponsesProvider>
    </QuestionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
