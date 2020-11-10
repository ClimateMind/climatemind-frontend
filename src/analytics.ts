import TagManager from 'react-gtm-module';

export const pushQuestionToDataLayer = (questionId: number) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'question_start',
      eventProps: {
        category: 'questionnaire',
        action: 'click',
        label: 'questionid',
        value: questionId,
      },
    },
  });
};
