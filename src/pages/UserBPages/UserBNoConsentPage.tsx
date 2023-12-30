import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, makeStyles } from '@material-ui/core';

import PageContent from '../../components/PageContent';
import PageTitle from '../../components/PageTitle';
import ROUTES from '../../router/RouteConfig';
import { useUserB } from '../../hooks/useUserB';
import Wrapper from 'components/Wrapper';
import { CmButton, CmTypography } from 'shared/components';

const styles = makeStyles(() => {
  return {
    message: { fontSize: '20px', fontWeight: 100 },
    buttonDiv: {
      textAlign: 'center',
    },
  };
});

function UserBNoConsentPage() {
  const classes = styles();
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
            <PageTitle>No Problem</PageTitle>
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

        <Grid item className={classes.buttonDiv}>
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
