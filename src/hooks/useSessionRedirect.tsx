import { useEffect } from 'react';
import { useSession } from './useSession';
import { useHistory } from 'react-router-dom';
import ROUTES from '../components/Router/RouteConfig';

// TODO: Remove or update this now session id is different. We no longer need to redirect on session id as there is always one as it is set on load. This
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
