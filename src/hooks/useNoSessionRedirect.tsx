import { useEffect } from 'react';
import { useSession } from './useSession';
import { useHistory } from 'react-router-dom';
import ROUTES from '../components/Router/RouteConfig';

export const useNoSessionRedirect = () => {
  const { push } = useHistory();

  const { sessionId } = useSession();

  useEffect(() => {
    if (!sessionId) {
      return push(ROUTES.ROUTE_HOME);
    }
  }, [sessionId, push]);
};

export default useNoSessionRedirect;
