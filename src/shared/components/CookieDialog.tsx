import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';

import ROUTES from 'src/router/RouteConfig';
import CmTypography from './CmTypography';
import CmButton from './CmButton';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setHasAcceptedCookies } from 'src/store/globalSlice';

function CookieDialog() {
  const hasAcceptedCookies = useAppSelector(state => state.global.hasAcceptedCookies);
  const dispatch = useAppDispatch();

  function declineCookies() {
    dispatch(setHasAcceptedCookies(false));
  }

  function acceptCookies() {
    dispatch(setHasAcceptedCookies(true));
  }

  return (
    <Dialog open={hasAcceptedCookies === undefined}>
      <div style={{ padding: 20 }}>
        <CmTypography variant="h3" style={styles.title}>Climate Mind Uses Cookies</CmTypography>

        <CmTypography variant="body" style={{ marginTop: 20, marginBottom: 20 }}>
          This site requires cookies. To find out how we use cookies please view
          our <Link style={styles.link} to={ROUTES.PRIVACY_PAGE}>Privacy Policy</Link>.
        </CmTypography>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CmButton variant='text' text='Decline' onClick={declineCookies} />
          <CmButton variant='text' text='Accept' onClick={acceptCookies} />
        </div>
      </div>
    </Dialog>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  title: {
    margin: 0,
    textAlign: 'left',
  },
  link: {
    color: '#39F5AD',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

export default CookieDialog;
