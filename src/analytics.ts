import TagManager from 'react-gtm-module';
import moment from 'moment';


const makeDate = () => moment(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss');


export const pushQuizStartToDataLayer = (quizSessionId: string): void  => {
  console.log('Quiz Start to DL', quizSessionId)
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'quiz_start',
        label: 'quiz_session_id',
        value: quizSessionId,
        event_ts: makeDate(),
      }
    },
  });
};

export const pushQuizFinishToDataLayer = (quizSessionId: string, sessionId: string): void => {
  console.log('Quiz Submit to DL', sessionId, quizSessionId)
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'quiz_finish',
        label: 'quiz_complete',
        value: {quizSessionId, sessionId},
        event_ts: makeDate(),
      }
    },
  });
};


// This has been added to the prettier ignore file as tag manager does not pick up events when trailing commas are added to the data layer object
export const pushQuestionToDataLayer = (questionId: number, quizSessionId:string): void  => {
  console.log('Question to DL', quizSessionId, quizSessionId)
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'question_start',
        label: 'question',
        value: {questionId, quizSessionId},
        event_ts: makeDate()
      }
    },
  });
};

export const addCardClickToDataLayer = 
  (iri: string, sessionId: string | null): void => {
  if(iri){
    TagManager.dataLayer({
      dataLayer: {
        event: 'event',
        eventProps: {
          category: 'card',
          action: 'card_click',
          label: 'card_iri',
          value: iri,
          session_id: sessionId,
          event_ts: makeDate()
        }
      },
    });
  }
};
