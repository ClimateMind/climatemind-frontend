export type TSession = {
  sessionId: string | null;
  zipCode: string | null;
  hasAcceptedCookies: boolean;
  setHasAcceptedCookies: (hasAcceptedCookies: boolean) => any;
  hasCompletedQuiz: boolean;
  setHasCompletedQuiz: (hasCompletedQuiz: boolean) => any;
};
