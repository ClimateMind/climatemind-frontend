import { useContext } from 'react';
import { SessionContext, SessionDispatch } from '../contexts/session';

export const useSession = () => {
  const session = useContext(SessionContext);
  const setSession = useContext(SessionDispatch);

  const { sessionId, zipCode, hasAcceptedPrivacyPolicy } = session;

  // We dont want to clear has acceptedPrivacyPolicy
  const clearSession = () => {
    if (setSession) {
      setSession({
        ...session,
        sessionId: null,
        zipCode: null,
      });
    }
  };

  const setSessionId = (sessionId: string) => {
    if (setSession) {
      setSession({
        ...session,
        sessionId: sessionId,
      });
    }
  };

  const setZipCode = (zipCode: string) => {
    if (setSession) {
      setSession({
        ...session,
        zipCode: zipCode,
      });
    }
  };

  const setHasAcceptedPrivacyPolicy = (hasAccepted: boolean) => {
    if (setSession) {
      setSession({
        ...session,
        hasAcceptedPrivacyPolicy: hasAccepted,
      });
    }
  };

  return {
    sessionId,
    zipCode,
    setSessionId,
    setZipCode,
    clearSession,
    hasAcceptedPrivacyPolicy,
    setHasAcceptedPrivacyPolicy,
  };
};
