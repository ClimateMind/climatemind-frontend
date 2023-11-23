import { IAnalyticsEvent } from './IAnalyticsEvent';

/** value: sessionId */
export const GetStartedButtonEvent: IAnalyticsEvent = {
  description: 'Get started button',
  event: 'event',
  category: 'landing_page',
  action: 'get_started',
  label: 'session_id',
};

/** value: sessionId */
export const LoginButtonEvent: IAnalyticsEvent = {
  description: 'Login button',
  event: 'event',
  category: 'landing_page',
  action: 'login',
  label: 'session_id',
};

/** value:  `${questionId}:${questionNumber + 1}` */
export const QuestionStartEvent: IAnalyticsEvent = {
  description: 'Question start',
  event: 'event',
  category: 'questionnaire',
  action: 'question_loaded',
  label: 'question_id',
};

/** value: questionSet */
export const QuestionnaireFinishedEvent: IAnalyticsEvent = {
  description: 'Questionnaire finished',
  event: 'event',
  category: 'questionnaire',
  action: 'questionnaire_finish',
  label: 'questionnaire_session_id',
};

/** value: cardIri */
export const CardOpenEvent: IAnalyticsEvent = {
  description: 'Card open',
  event: 'event',
  category: 'card',
  action: 'card_open',
  label: 'card_iri',
};

/** value: cardIri */
export const CardCloseEvent: IAnalyticsEvent = {
  description: 'Card close',
  event: 'event',
  category: 'card',
  action: 'card_close',
  label: 'card_iri',
};

/** value: signUpId */
export const RegistrationPageOpenEvent: IAnalyticsEvent = {
  description: 'Registration page open',
  event: 'event',
  category: 'signup_page',
  action: 'signup_open',
  label: 'page_load_id',
};

/** value: sessionId */
export const StartTalkingEvent: IAnalyticsEvent = {
  description: 'Start talking with people',
  event: 'event',
  category: 'conversation',
  action: 'start_talking',
  label: 'session_id',
};

/** value: sessionId */
export const TalkMenuButtonEvent: IAnalyticsEvent = {
  description: 'Talk menu button',
  event: 'event',
  category: 'conversation',
  action: 'conversation',
  label: 'session_id',
};
