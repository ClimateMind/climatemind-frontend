import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES_CONFIG } from '../routes/routes';
import { useSession } from './useSession';

export const useNoSessionRedirect = () => {
  const { push } = useHistory();

  const { sessionId } = useSession();

  useEffect(() => {
    if (!sessionId) {
      return push(ROUTES_CONFIG.ROUTE_HOME);
    }
  }, [sessionId, push]);
};

export default useNoSessionRedirect;
