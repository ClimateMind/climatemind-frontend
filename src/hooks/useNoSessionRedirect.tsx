import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSession } from './useSession';
import ROUTES from '../components/Router/RouteConfig';

export const useNoSessionRedirect = () => {
  const navigate = useNavigate();

  const { sessionId } = useSession();

  useEffect(() => {
    if (!sessionId) {
      return navigate(ROUTES.HOME_PAGE);
    }
  }, [sessionId]);
};

export default useNoSessionRedirect;
