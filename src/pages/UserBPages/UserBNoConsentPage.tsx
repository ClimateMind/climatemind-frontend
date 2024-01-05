import { useNavigate, useLocation } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';

function UserBNoConsentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();

  const handleBackToImpacts = () => {
    navigate(`${ROUTES.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <Page style={{ minHeight: '100%' }}>
      <PageContent>
        <CmTypography variant='h1'>No Problem</CmTypography>

        <CmTypography variant="h4" style={{ margin: 0 }}>
          Your link from {'your friend'} won't expire 
          so you can return any time.
        </CmTypography>

        <CmTypography variant="h4">
          We'll be here if you do!
        </CmTypography>

        <CmButton color='userb' text='Back' onClick={handleBackToImpacts} />
      </PageContent>
    </Page>
  );
};

export default UserBNoConsentPage;
