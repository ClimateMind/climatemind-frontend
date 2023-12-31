import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import PageContent from '../../components/PageContent';
import ROUTES from '../../router/RouteConfig';
import { useUserB } from '../../hooks/useUserB';
import Wrapper from 'components/Wrapper';
import { CmButton, CmTypography } from 'shared/components';

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
    <Wrapper>
      <PageContent>
        <Grid item>
          <Box px={4}>
            <CmTypography variant='h1'>No Problem</CmTypography>
            <Box py={4}>
              <CmTypography variant="h4" style={{ margin: 0 }}>
                Your link from {'your friend'} won't expire 
                so you can return any time.
              </CmTypography>
            </Box>
            <Box>
              <CmTypography variant="h4">
                We'll be here if you do!
              </CmTypography>
            </Box>
          </Box>
        </Grid>

        <Grid item style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CmButton
              text='Back'
              onClick={handleBackToImpacts}
            />
          </div>
        </Grid>
      </PageContent>
    </Wrapper>
  );
};

export default UserBNoConsentPage;
