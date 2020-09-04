import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { QuestionsProvider } from './contexts/questions';

ReactDOM.render(
  <React.StrictMode>
    <QuestionsProvider>
      <App />
    </QuestionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
