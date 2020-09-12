import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { QuestionsProvider } from './contexts/questions';
import { Helmet } from 'react-helmet';

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta 
        httpEquiv="Content-Security-Policy"
        content="style-src 'self' https://use.typekit.net/"
      />
    </Helmet>
    <QuestionsProvider>
      <App />
    </QuestionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
