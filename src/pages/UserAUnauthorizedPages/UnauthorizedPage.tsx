import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'src/router/RouteConfig';
import { useAppSelector } from 'src/store/hooks';

function UnauthorizedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useAppSelector((state) => state.auth.userA.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.CLIMATE_FEED_PAGE);
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return <Outlet />;
}

export default UnauthorizedPage;
