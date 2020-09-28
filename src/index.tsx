import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';

ReactDOM.render(
  <React.StrictMode>
    <QuestionsProvider>
      <ResponsesProvider>
        <App />
      </ResponsesProvider>
    </QuestionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
