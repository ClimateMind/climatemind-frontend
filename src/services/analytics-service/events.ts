import { IAnalyticsEvent } from './IAnalyticsEvent';

/** value: sessionId */
export const GetStartedButtonEvent: IAnalyticsEvent = {
  category: 'landing_page',
  action: 'get_started',
  label: 'session_id',
};

/** value: sessionId */
export const LoginButtonEvent: IAnalyticsEvent = {
  category: 'landing_page',
  action: 'login',
  label: 'session_id',
};

/** value:  `${questionId}:${questionNumber + 1}` */
export const QuestionStartEvent: IAnalyticsEvent = {
  category: 'questionnaire',
  action: 'question_loaded',
  label: 'question_id',
};

/** value: questionSet */
export const QuestionnaireFinishedEvent: IAnalyticsEvent = {
  category: 'questionnaire',
  action: 'questionnaire_finish',
  label: 'questionnaire_session_id',
};

/** value: cardIri */
export const CardOpenEvent: IAnalyticsEvent = {
  category: 'card',
  action: 'card_open',
  label: 'card_iri',
};

/** value: cardIri */
export const CardCloseEvent: IAnalyticsEvent = {
  category: 'card',
  action: 'card_close',
  label: 'card_iri',
};

/** value: signUpId */
export const RegistrationPageOpenEvent: IAnalyticsEvent = {
  category: 'signup_page',
  action: 'signup_open',
  label: 'page_load_id',
};

/** value: sessionId */
export const StartTalkingEvent: IAnalyticsEvent = {
  category: 'conversation',
  action: 'start_talking',
  label: 'session_id',
};

/** value: sessionId */
export const TalkMenuButtonEvent: IAnalyticsEvent = {
  category: 'conversation',
  action: 'conversation',
  label: 'session_id',
};
