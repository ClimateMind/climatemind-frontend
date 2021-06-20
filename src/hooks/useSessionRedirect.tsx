import { useEffect } from 'react';
import { useSession } from './useSession';
import { useHistory } from 'react-router-dom';
import ROUTES from '../components/Router/RouteConfig';

export const useSessionRedirect = () => {
  const { push } = useHistory();

  const { sessionId } = useSession();

  useEffect(() => {
    if (sessionId) {
      return push(ROUTES.ROUTE_FEED);
    }
  }, [sessionId, push]);
};

export default useSessionRedirect;
