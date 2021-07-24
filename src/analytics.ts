import TagManager from 'react-gtm-module';
import moment from 'moment';


const makeDate = () => moment(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss');


export const pushQuizStartToDataLayer = (sessionId: string): void  => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'questionnaire_start',
        label: 'questionnaire_session_id',
        value: sessionId,
        event_ts: makeDate(),
      }
    },
  });
};

export const pushQuizFinishToDataLayer = (sessionId: string): void => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'questionnaire_finish',
        label: 'questionnaire_session_id',
        value: sessionId,
        event_ts: makeDate(),
      }
    },
  });
};

// This has been added to the prettier ignore file as tag manager does not pick up events when trailing commas are added to the data layer object
export const pushQuestionToDataLayer = (questionId: number, sessionId:string): void  => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'question_loaded',
        label: 'question_id',
        value: questionId, 
        session_id: sessionId,
        event_ts: makeDate()
      }
    },
  });
};

export const addCardOpenToDataLayer = 
  (iri: string, sessionId: string): void => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'card',
        action: 'card_open',
        label: 'card_iri',
        value: iri,
        session_id: sessionId,
        event_ts: makeDate()
      }
    },
  });
};

export const addCardCloseToDataLayer = 
  (iri: string, sessionId: string): void => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'event',
        eventProps: {
          category: 'card',
          action: 'card_close',
          label: 'card_iri',
          value: iri,
          session_id: sessionId,
          event_ts: makeDate()
        }
      },
    });
};

export const addSignUpPageLoadToDataLayer = 
    (signUpId : string, sessionId: string): void => {
      TagManager.dataLayer({
        dataLayer: {
          event: 'event',
          eventProps: {
            category: 'signup_page',
            action: 'signup_open',
            label: 'signup_id',
            value: signUpId,
            session_id: sessionId,
            event_ts: makeDate()
          }
        },
      });
  };
