import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { useAppSelector } from 'store/hooks';

function AuthorizedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useAppSelector((state) => state.auth.userA.isLoggedIn);

  const [lastLoggedIn, setLastLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && lastLoggedIn) {
      navigate(ROUTES.HOME_PAGE);
    } else if (!isLoggedIn && !lastLoggedIn) {
      navigate(ROUTES.LOGIN_PAGE, { state: { from: location.pathname + location.search } });
    }

    setLastLoggedIn(isLoggedIn);
  }, [isLoggedIn, navigate, location.pathname]);

  return <>{isLoggedIn ? <Outlet /> : null}</>;
}

export default AuthorizedPage;
