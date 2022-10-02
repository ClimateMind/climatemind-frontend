export type TSession = {
  sessionId: string | null;
  quizId: string | null;
  sessionState: 'new' | 'loading' | 'active';
  zipCode: string | null;
  hasAcceptedCookies: boolean;
  setHasAcceptedCookies: (hasAcceptedCookies: boolean) => any;
};
