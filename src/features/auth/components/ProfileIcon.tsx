import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmTypography } from 'shared/components';
import { useAuth } from 'hooks/auth/useAuth';

function ProfileIcon() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (!auth.isLoggedIn) return null;

  return (
    <div style={styles.icon} onClick={() => navigate(ROUTES.PROFILE_PAGE)} >
      <CmTypography variant='h4' style={{ margin: 0 }}>
        {auth.userIntials}
      </CmTypography>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    background: '#39F5AD',
    borderRadius: '50%',
    width: 40,
    height: 40,
  }
};

export default ProfileIcon;
