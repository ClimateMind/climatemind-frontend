export type TSession = {
  sessionId: string | null;
  quizSessionId: string | null;
  zipCode: string | null;
  hasAcceptedCookies: boolean;
  setHasAcceptedCookies: (hasAcceptedCookies: boolean) => any;
};
