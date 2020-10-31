import { useContext } from 'react';
import { SessionContext, SessionDispatch } from '../contexts/session';

export const useSession = () => {
  const sessionId = useContext(SessionContext);
  const setSessionId = useContext(SessionDispatch);

  const clearSession = () => {
    if (setSessionId) {
      setSessionId(null);
    }
  };

  return { sessionId, setSessionId, clearSession };
};
