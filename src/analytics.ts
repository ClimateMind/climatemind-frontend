import TagManager from 'react-gtm-module';
export const pushQuestionToDataLayer = (questionId: number) => {
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
