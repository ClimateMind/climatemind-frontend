import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTES from '../router/RouteConfig';
import { useAppSelector } from 'store/hooks';

export const useNoSessionRedirect = () => {
  const navigate = useNavigate();

  const { sessionId } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!sessionId) {
      return navigate(ROUTES.HOME_PAGE);
    }
  }, [sessionId]);
};

export default useNoSessionRedirect;
