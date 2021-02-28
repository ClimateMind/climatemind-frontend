import React from 'react';
import { useQuery } from 'react-query';
import { getMyths } from '../api/getMyths';
import { COLORS } from '../common/styles/CMTheme';
import { Typography, Grid, makeStyles, Box } from '@material-ui/core';
import Loader from '../components/Loader';
import Error500 from './Error500';
import MythCard from '../components/MythCard';
import Wrapper from '../components/Wrapper';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

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

  const { data, isLoading, error } = useQuery('myths', getMyths);

  if (error) return <Error500 />;

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

        <ScrollToTopOnMount />

        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Box my={3} px={1}>
            <Typography variant="h4">
              Climate Mind is against misinformation.
            </Typography>
          </Box>

          <Grid item sm={12} lg={12} container>
            {isLoading && <Loader />}
            {data?.myths.map((myth, i) => (
              <MythCard myth={myth} key={i} />
            ))}
          </Grid>
        </Grid>
        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </Grid>
  );
};

export default MythFeed;
