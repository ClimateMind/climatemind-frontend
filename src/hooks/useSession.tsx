import { useContext } from 'react';
import { SessionContext, SessionDispatch } from '../contexts/session';
import { useLocalStorage } from './useLocalStorage';

export const useSession = () => {
  const session = useContext(SessionContext);
  const setSession = useContext(SessionDispatch);

  const {
    sessionId,
    zipCode,
    hasAcceptedCookies,
    setHasAcceptedCookies,
  } = session;

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

  // const setHasAcceptedCookies = (hasAccepted: boolean) => {
  //   if (setSession) {
  //     setSession({
  //       ...session,
  //       hasAcceptedCookies: hasAccepted,
  //     });
  //   }
  // };

  return {
    sessionId,
    zipCode,
    setSessionId,
    setZipCode,
    clearSession,
    hasAcceptedCookies,
    setHasAcceptedCookies,
  };
};
