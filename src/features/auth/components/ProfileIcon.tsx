import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmTypography } from 'shared/components';
import { useAuth } from 'hooks/auth/useAuth';

function ProfileIcon() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (!auth.isLoggedIn) return null;

  return (
    <CmTypography
      variant='h4'
      onClick={() => navigate(ROUTES.PROFILE_PAGE)}
      style={{
        cursor: 'pointer',
        background: '#39F5AD',
        borderRadius: '50%',
        padding: '10px 12px',
        margin: 0,
      }}
    >
      {auth.userIntials}
    </CmTypography>
  );
}

export default ProfileIcon;
