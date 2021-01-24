import React from 'react';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import { Typography, Grid, makeStyles, Box } from '@material-ui/core';
import Wrapper from '../components/Wrapper';
import { useHistory } from 'react-router';
import PrivacyPolicyText from '../components/PrivacyPolicyText';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import PrevButton from '../components/PrevButton';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  callToActionSection: {
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
  stickyHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#FFF',
    width: '100%',
  },
});

const PrivacyPolicy: React.FC = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <Grid
      container
      className={classes.root}
      data-testid="Privacy Policy"
      justify="space-around"
    >
      <Wrapper bgColor={COLORS.PRIMARY}>
        <Grid item sm={false} lg={4}>
          {/* left gutter */}
        </Grid>

        <ScrollToTopOnMount />

        <Grid
          item
          sm={12}
          lg={4}
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid>
            <Box mt={2} mb={3} mx={2}>
              <Grid container direction="row" alignItems="center" spacing={5}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">Privacy Policy</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box py={2} mt={-4}>
              <PrevButton clickPrevHandler={() => history.goBack()} />
            </Box>
          </Grid>

          <Grid item sm={12} lg={12} container>
            <PrivacyPolicyText />
          </Grid>
          <Grid item container justify="center">
            <Box my={4}>
              <Button variant="contained" onClick={() => history.goBack()}>
                Go Back
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </Grid>
  );
};

export default PrivacyPolicy;
