import React from 'react';
import { Button } from '../Button';
import ROUTES from '../Router/RouteConfig';
import { useHistory } from 'react-router';
import { useAuth } from '../../hooks/auth/useAuth';

export type MenuLoginLogoutProps = {
  isLoggedIn: boolean;
  setMenuIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLoginLogout: React.FC<MenuLoginLogoutProps> = ({
  isLoggedIn,
  setMenuIsShowing,
}) => {
  const { push } = useHistory();
  const { logout } = useAuth();

  const handleLogin = () => {
    push(ROUTES.ROUTE_LOGIN);
    setMenuIsShowing(false);
  };

  const handleLogout = () => {
    setMenuIsShowing(false);
    logout();
  };

  return (
    <>
      {!isLoggedIn ? (
        <Button
          data-cy="LoginButton"
          variant="contained"
          color="primary"
          // startIcon={<LoginIcon />}
          onClick={handleLogin}
          disableElevation
        >
          Log In
        </Button>
      ) : (
        <Button
          data-cy="LogoutButton"
          variant="contained"
          color="primary"
          // startIcon={<LogoutIcon />}
          onClick={handleLogout}
          disableElevation
        >
          Log Out
        </Button>
      )}
    </>
  );
};

export default MenuLoginLogout;
