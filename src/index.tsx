import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { PersonalityProvider } from './contexts/personality';
import { SessionProvider } from './contexts/session';
import { ClimateFeedProvider } from './contexts/climateFeed';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-56GRWXW',
  dataLayer: {
    userId: '001',
    userProject: 'Climate Mind App',
    events: {
      sendQuestionNumber: 'question_start',
    },
  },
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <QuestionsProvider>
        <ResponsesProvider>
          <PersonalityProvider>
            <ClimateFeedProvider>
              <App />
            </ClimateFeedProvider>
          </PersonalityProvider>
        </ResponsesProvider>
      </QuestionsProvider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
