export type TSession = {
  sessionId: string | null;
  quizId: string | null;
  // alignmentScoresId: string | null;
  zipCode: string | null;
  hasAcceptedCookies: boolean;
  setHasAcceptedCookies: (hasAcceptedCookies: boolean) => any;
};
