import TagManager from 'react-gtm-module';

// This has been added to the prettier ignore file as tag manager does not pick up events when trailing commas are added to the data layer object
export const pushQuestionToDataLayer = (questionId: number): void  => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'question_start',
        label: 'question_id',
        value: questionId,
        event_ts: new Date().toISOString().slice(0, 19).replace('T', ' ')
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
          event_ts: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
      },
    });
  }
};
