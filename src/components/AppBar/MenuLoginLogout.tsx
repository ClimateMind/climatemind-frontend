import React from 'react';
import { useNavigate } from 'react-router';
import MaterialIcon from '@material/react-material-icon';

import { Button } from '../Button';
import ROUTES from '../Router/RouteConfig';
import { useAuth } from '../../hooks/auth/useAuth';

export type MenuLoginLogoutProps = {
  isLoggedIn: boolean;
  setMenuIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLoginLogout: React.FC<MenuLoginLogoutProps> = ({
  isLoggedIn,
  setMenuIsShowing,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogin = () => {
    navigate(ROUTES.LOGIN_PAGE);
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
          startIcon={<MaterialIcon icon="login" />}
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
          startIcon={<MaterialIcon icon="logout" />}
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
