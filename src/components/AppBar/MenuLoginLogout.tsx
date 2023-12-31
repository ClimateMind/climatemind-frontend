import { useNavigate } from 'react-router';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import ROUTES from '../../router/RouteConfig';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmButton } from 'shared/components';

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
        <CmButton
          text='Log In'
          onClick={handleLogin}
          startIcon={<LoginIcon />}
        />
      ) : (
        <CmButton
          text='Log Out'
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        />
      )}
    </>
  );
};

export default MenuLoginLogout;
