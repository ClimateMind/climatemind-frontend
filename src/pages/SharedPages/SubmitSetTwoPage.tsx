import { useNavigate } from 'react-router-dom';

import ROUTES from 'src/router/RouteConfig';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';

function SubmitSetTwoPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <PageContent>
        <CmTypography variant="h1">Woohoo! Good Job!</CmTypography>
        <CmTypography variant="body" style={{ textAlign: 'center' }}>
          With the questions you just answered we can predict your Climate Personality.
        </CmTypography>

        <img src='/submit-set-two-reward.svg' alt='rewards' style={{ maxWidth: '640px', marginTop: 40, marginBottom: 40 }} />

        <CmTypography variant="body" style={{ textAlign: 'center', marginBottom: 40 }}>
          This is a ranking of the top three personal values that you deploy when making decisions.
        </CmTypography>

        <CmButton text="Find out my Climate Personality" onClick={() => navigate(ROUTES.PERSONAL_VALUES_PAGE)} />
      </PageContent>
    </Page>
  );
}

export default SubmitSetTwoPage;
