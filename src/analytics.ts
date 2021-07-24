import TagManager from 'react-gtm-module';
import moment from 'moment';

// This has been added to the prettier ignore file as tag manager does not pick up events when trailing commas are added to the data layer object

const makeDate = () =>
  moment(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss');

export const pushQuizFinishToDataLayer = (
  sessionId: string,
  // TODO: Remove default
  questionSet = 1
): void => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'questionnaire_finish',
        label: 'question_set',
        value: questionSet,
        session_id: sessionId,
        event_ts: makeDate(),
      },
    },
  });
};

//  TODO: Update this to use the new session id
export const pushQuestionToDataLayer = (
  questionId: number,
  questionNumber: number,
  sessionId: string
): void => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'question_loaded',
        label: 'question_id:question_number',
        value: `${questionId}:${questionNumber + 1}`,
        session_id: sessionId,
        event_ts: makeDate(),
      },
    },
  });
};

export const addCardOpenToDataLayer = (
  iri: string,
  sessionId: string
): void => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'card',
        action: 'card_open',
        label: 'card_iri',
        value: iri,
        session_id: sessionId,
        event_ts: makeDate(),
      },
    },
  });
};

export const addCardCloseToDataLayer = (
  iri: string,
  sessionId: string
): void => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'card',
        action: 'card_close',
        label: 'card_iri',
        value: iri,
        session_id: sessionId,
        event_ts: makeDate(),
      },
    },
  });
};

export const addSignUpPageLoadToDataLayer = (
  signUpId: string,
  sessionId: string
): void => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'signup_page',
        action: 'signup_open',
        label: 'page_load_id',
        value: signUpId,
        session_id: sessionId,
        event_ts: makeDate(),
      },
    },
  });
};
