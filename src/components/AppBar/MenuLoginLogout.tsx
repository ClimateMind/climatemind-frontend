import React from 'react';
import Button from '../Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ROUTES from '../Router/RouteConfig';
import { useHistory } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

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
    push(ROUTES.ROUTE_HOME);
    logout();
  };

  return (
    <>
      {!isLoggedIn ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogin}
          disableElevation
        >
          Log In
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ExitToAppIcon />}
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
