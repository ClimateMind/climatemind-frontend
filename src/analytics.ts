import TagManager from 'react-gtm-module';

// This has been added to the prettier ignore file as tag manager does not pick up events when trailing commas are added to the data layer object
export const pushQuestionToDataLayer = (questionId: number): void  => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'event',
      eventProps: {
        category: 'questionnaire',
        action: 'question_start',
        label: 'questionId',
        value: questionId
      }
    },
  });
};

export const addCardClickToDataLayer = 
  (iri: string, sessionId: string | null): void => {
  console.log(`Card Clicked ${iri}`);
  if(iri){
    TagManager.dataLayer({
      dataLayer: {
        event: 'event',
        eventProps: {
          category: 'card',
          action: 'card_click',
          label: 'cardIri',
          value: {iri, sessionId},
          sessionId: sessionId
        }
      },
    });
  }
};
