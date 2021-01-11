import { useContext } from 'react';
import { SessionContext } from '../contexts/session';

export const useSession = () => {
  const {sessionId, setSessionId, zipCode, setZipCode} = useContext(SessionContext);

  const clearSession = () => {
      setSessionId('');
      setZipCode('');
  };

  return {
    sessionId,
    setSessionId,
    zipCode,
    setZipCode,
    clearSession,
  };
};
