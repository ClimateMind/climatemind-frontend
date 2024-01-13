import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';

function Error500Page() {
  const navigate = useNavigate();
  const { logMessage } = useErrorLogging();
  const { pathname } = useLocation();

  useEffect(() => {
    logMessage(`Err500: ${pathname}`);
  }, []);

  const sendEmail = () => {
    window.open('mailto:hello@climatemind.org');
  };

  return (
    <Page style={{ background: 'white' }}>
      <PageContent>
        <CmTypography variant="h1" style={{ fontSize: 60, marginTop: '15vh' }}>
          :(
        </CmTypography>
        <CmTypography variant="h2" >It’s broken…</CmTypography>
        <CmTypography variant="body" style={{ fontSize: 20, textAlign: 'center', margin: '1em 0' }}>
          the page that is, not the Earth <br />
          – there’s still hope for it!
        </CmTypography>

        <CmButton
          text='Go Back to Previous Page'
          onClick={() => navigate(-1)}
          style={{ marginTop: 30, marginBottom: 10 }}
        />

        <CmButton
          text='Get Help / Contact Us'
          variant="text"
          onClick={() => sendEmail()}
        />
      </PageContent>
    </Page>
  );
};

export default Error500Page;
