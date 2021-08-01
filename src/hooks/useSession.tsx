import { useContext } from 'react';
import { SessionContext, SessionDispatch } from '../contexts/session';

// TODO: Quiz Session needs update to the new thing
export const useSession = () => {
  const session = useContext(SessionContext);
  const setSession = useContext(SessionDispatch);

  const {
    sessionId,
    zipCode,
    hasAcceptedCookies,
    setHasAcceptedCookies,
    quizId,
  } = session;

  // We dont want to clear has acceptedPrivacyPolicy
  const clearSession = () => {
    if (setSession) {
      setSession({
        ...session,
        sessionId: null,
        zipCode: null,
        quizId: null,
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

  const setQuizId = (quizId: string) => {
    if (setSession) {
      setSession({
        ...session,
        quizId,
      });
    }
  };

  return {
    sessionId,
    zipCode,
    setSessionId,
    setZipCode,
    clearSession,
    quizId,
    setQuizId,
    hasAcceptedCookies,
    setHasAcceptedCookies,
  };
};
