export type TSession = {
  sessionId: string | null;
  zipCode: string | null;
  hasAcceptedCookies: boolean;
  setHasAcceptedCookies: (hasAcceptedCookies: boolean) => any;
};
