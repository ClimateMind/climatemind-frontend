import { useContext, useEffect } from 'react';
import { SessionContext, SessionDispatch } from '../contexts/session';
import useLocalStorage from './useLocalStorage';

export const useSession = () => {
  const session = useContext(SessionContext);
  const setSession = useContext(SessionDispatch);

  const {
    sessionId,
    zipCode,
    hasAcceptedCookies,
    setHasAcceptedCookies,
  } = session;

  const [localSessionId, setLocalSessionId] = useLocalStorage('sessionId', '');

  // We dont want to clear has acceptedPrivacyPolicy
  const clearSession = () => {
    if (setSession && setLocalSessionId) {
      setLocalSessionId('');

      setSession({
        ...session,
        sessionId: localSessionId,
        zipCode: null,
        quizSessionId: null,
      });
    }
  };

  const setSessionId = (sessionId: string) => {
    if (setSession && setLocalSessionId) {
      setLocalSessionId(sessionId);
      setSession({
        ...session,
        sessionId: localSessionId,
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

  const setQuizSessionId = (quizSessionId: string) => {
    if (setSession) {
      setSession({
        ...session,
        quizSessionId,
      });
    }
  };

  useEffect(() => {
    if (setSession) {
      setSession((prevState) => ({
        ...prevState,
        sessionId: localSessionId,
      }));
    }
  }, [localSessionId, setSession]);

  return {
    sessionId,
    zipCode,
    setSessionId,
    setZipCode,
    clearSession,
    setQuizSessionId,
    hasAcceptedCookies,
    setHasAcceptedCookies,
  };
};
