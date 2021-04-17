import React from 'react';
import { useQuery } from 'react-query';
import { getMyths } from '../api/getMyths';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import { Typography, Grid, makeStyles, Box } from '@material-ui/core';
import Loader from '../components/Loader';
import Error500 from './Error500';
import MythCard from '../components/MythCard';
import Wrapper from '../components/Wrapper';
import BottomMenu from '../components/BottomMenu';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    paddingBottom: 24,
  },
  callToActionSection: {
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const MythFeed: React.FC = () => {
  const classes = styles();

  const { data, status } = useQuery('myths', getMyths);

  if (status === 'loading') {
    return (
      <Wrapper bgColor={COLORS.ACCENT4}>
        <Loader />
      </Wrapper>
    );
  }

  if (data) {
    const { myths } = data;

    return (
      <Grid
        container
        className={classes.root}
        data-testid="Myths Feed"
        justify="space-around"
      >
        <Wrapper bgColor={COLORS.ACCENT4}>
          <Grid item sm={false} lg={4}>
            {/* left gutter */}
          </Grid>

          <Grid
            item
            sm={12}
            lg={4}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Box mt={2} mb={3} mx={2}>
                <Grid container direction="row" alignItems="center" spacing={5}>
                  <Grid item xs={3}>
                    <Logo width="76" data-testid="climate-mind-logo" />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h4">
                      Climate Mind is against fake news.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={12} lg={12} container>
              {myths.map((myth, i) => (
                <MythCard myth={myth} key={i} />
              ))}
            </Grid>
          </Grid>

          <Grid item sm={false} lg={4}>
            {/* right gutter */}
          </Grid>
        </Wrapper>
        <BottomMenu />
      </Grid>
    );
  }
  // All else fails return an error
  return <Error500 />;
};

export default MythFeed;
