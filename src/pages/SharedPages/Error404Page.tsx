import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { useErrorLogging } from '../../shared/hooks/useErrorLogging';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';

function Error404Page() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logMessage } = useErrorLogging();

  useEffect(() => {
    logMessage(`Error 404: ${pathname} couldn't be found.`);
  }, []);

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent style={{ flex: 1, height: '100%', padding: '0 20px' }}>
        <CmTypography variant="h1" style={styles.emoji}>:(</CmTypography>
        <CmTypography variant="h1" style={styles.title}>Well this is awkward…</CmTypography>

        <CmTypography variant="h4" style={styles.message}>
          the page that was requested can't be found, but you could visit our{' '}
          <Link style={styles.links} to="/">
            Homepage
          </Link>
        </CmTypography>

        <div style={{ marginTop: 'auto', marginBottom: 50 }}>
          <CmButton
            text='Go to homepage'
            onClick={() => navigate('/')}
            style={{ margin: 'auto' }}
          />

          <CmButton
            variant="text"
            text='Get Help / Contact Us'
            onClick={() => window.open('mailto:hello@climatemind.org')}
            style={{ marginTop: 10 }}
          />
        </div>
      </PageContent>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  emoji: {
    fontSize: '60px',
    fontWeight: 900,
    marginTop: '15vh',
  },
  title: {
    fontSize: '36px',
    fontWeight: 900,
    margin: '1em 0',
  },
  message: { fontSize: '20px', fontWeight: 300 },
  buttonDiv: {
    textAlign: 'center',
  },
  links: {
    textDecoration: 'none',
    color: '#39F5AD',
    fontWeight: 700,
  },
};

export default Error404Page;
