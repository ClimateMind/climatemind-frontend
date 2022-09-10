import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/Button';
import PageContent from '../../../components/PageContent';
import PageTitle from '../../../components/PageTitle';
import PageWrapper from '../../../components/PageWrapper';
import ROUTES from '../../../components/Router/RouteConfig';

const styles = makeStyles((theme) => {
  return {
    message: { fontSize: '20px', fontWeight: 100 },
    buttonDiv: {
      textAlign: 'center',
    },
  };
});

export const NoConsent: React.FC<{}> = () => {
  const classes = styles();
  const { push } = useHistory();
  const { state } = useLocation<{ userAName: string }>();

  return (
    <PageWrapper>
      <PageContent>
        <Grid item>
          <Box px={4}>
            <PageTitle>No Problem</PageTitle>
            <Box py={4}>
              <Typography
                variant="body1"
                align="center"
                className={classes.message}
              >
                Your link from {state?.userAName || 'your friend'} won't expire
                so you can return any time.
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                align="center"
                className={classes.message}
              >
                We'll be here if you do!
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item className={classes.buttonDiv}>
          <Box py={4}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => push(ROUTES.USERB_SHARED_IMPACTS)}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </PageContent>
    </PageWrapper>
  );
};
