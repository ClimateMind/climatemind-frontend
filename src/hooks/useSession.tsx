import { useContext } from 'react';
import { SessionContext } from '../contexts/session';

export const useSession = () => {
  const {sessionId, setSessionId} = useContext(SessionContext);

  const clearSession = () => {
      setSessionId('');
  };

  return { sessionId, setSessionId, clearSession };
};
