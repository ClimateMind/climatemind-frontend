import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { QuestionResponsesProvider } from './contexts/questionResponses';

ReactDOM.render(
  <React.StrictMode>
    <QuestionsProvider>
      <QuestionResponsesProvider>
        <App />
      </QuestionResponsesProvider>
    </QuestionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
