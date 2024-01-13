import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'src/router/RouteConfig';
import { useAppSelector } from 'src/store/hooks';

function AuthorizedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useAppSelector((state) => state.auth.userA.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.HOME_PAGE);
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return <>{isLoggedIn ? <Outlet /> : null}</>;
}

export default AuthorizedPage;
