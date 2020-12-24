import { useContext } from 'react';
import { SessionContext, SessionDispatch } from '../contexts/session';

export const useSession = () => {
  const session = useContext(SessionContext);
  const setSession = useContext(SessionDispatch);

  const { sessionId, zipCode } = session;

  const clearSession = () => {
    if (setSession) {
      setSession({
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

  return {
    sessionId,
    zipCode,
    setSessionId,
    setZipCode,
    clearSession,
  };
};
