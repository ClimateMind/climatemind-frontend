import React from 'react';
import Button from '../Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ROUTES from '../Router/RouteConfig';
import { useHistory } from 'react-router';

export type MenuLoginLogoutProps = {
  isLoggedIn: boolean;
};

const MenuLoginLogout: React.FC<MenuLoginLogoutProps> = ({ isLoggedIn }) => {
  const { push } = useHistory();
  // TODO: Connect logic to close menu paper and redirect to login
  return (
    <>
      {!isLoggedIn ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ExitToAppIcon />}
          onClick={() => push(ROUTES.ROUTE_LOGIN)}
          disableElevation
        >
          Log In
        </Button>
      ) : null}
    </>
  );
};

export default MenuLoginLogout;
