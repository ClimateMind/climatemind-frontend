import { useContext } from 'react';
import { SessionContext, SessionDispatch } from '../contexts/session';

export const useSession = () => {
  const sessionId = useContext(SessionContext);
  const setSessionId = useContext(SessionDispatch);

  return { sessionId, setSessionId };
};
