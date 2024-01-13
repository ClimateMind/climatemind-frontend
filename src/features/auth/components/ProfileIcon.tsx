import { useNavigate } from 'react-router-dom';

import ROUTES from 'src/router/RouteConfig';
import { CmTypography } from 'shared/components';
import { useAppSelector } from 'src/store/hooks';

function ProfileIcon() {
  const navigate = useNavigate();
  const { isLoggedIn, firstName, lastName } = useAppSelector((state) => state.auth.userA);

  if (!isLoggedIn) return null;

  return (
    <div style={styles.icon} onClick={() => navigate(ROUTES.PROFILE_PAGE)} >
      <CmTypography variant='h4' style={{ margin: 0 }}>
        {firstName[0] + lastName[0]}
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
