import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import PageWrapper from '../../../components/PageWrapper';
import PageContent from '../../../components/PageContent';
import { COLORS } from '../../../common/styles/CMTheme';
import { Button } from '../../../components/Button';
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
              back to impacts
            </Button>
          </Box>
        </Grid>
      </PageContent>
    </PageWrapper>
  );
};
