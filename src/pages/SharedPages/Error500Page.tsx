import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ItsBrokenIcon } from '../../components/ItsBrokenIcon';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton, Page, PageContent } from 'shared/components';

function Error500Page() {
  const navigate = useNavigate();
  const { logMessage } = useErrorLogging();
  const { pathname } = useLocation();

  useEffect(() => {
    logMessage(`Err500: ${pathname}`);
    //eslint-disable-next-line
  }, []);

  const sendEmail = () => {
    window.open('mailto:hello@climatemind.org');
  };

  return (
    <Page style={{ background: 'white' }}>
      <PageContent>
        <ItsBrokenIcon />

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
