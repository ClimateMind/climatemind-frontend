import { useNavigate } from 'react-router-dom';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';

function UserBNoConsentPage() {
  const navigate = useNavigate();

  const handleBackToImpacts = () => {
    navigate(-1);
  };

  return (
    <Page>
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
