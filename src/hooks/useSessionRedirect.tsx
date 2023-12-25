import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSession } from './useSession';
import ROUTES from '../components/Router/RouteConfig';

// TODO: Remove or update this now session id is different. We no longer need to redirect on session id as there is always one as it is set on load. This
export const useSessionRedirect = () => {
  const navigate = useNavigate();

  const { sessionId } = useSession();

  useEffect(() => {
    if (sessionId) {
      return navigate(ROUTES.CLIMATE_FEED_PAGE);
    }
  }, [sessionId]);
};

export default useSessionRedirect;
