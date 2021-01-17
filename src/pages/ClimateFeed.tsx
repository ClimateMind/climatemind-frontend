import React from 'react';
import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Error500 from '../pages/Error500';
import Wrapper from '../components/Wrapper';
import CardHeader from '../components/CardHeader';
import EffectOverlay from '../components/EffectOverlay';
import { useClimateFeed } from '../hooks/useClimateFeed';
import BottomMenu from '../components/BottomMenu';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    padding: 0,
  },
  feedContainer: {
    padding: 0,
  },
  typography: {
    textAlign: 'center',
  },
});

const ClimateFeed: React.FC = () => {
  const classes = useStyles();

  const { data, isLoading, error } = useClimateFeed();

  if (error) {
    return <Error500 />;
  }

  return (
    <>
      <Grid
        container
        className={classes.root}
        data-testid="Myths Feed"
        justify="space-around"
      >
        <Wrapper bgColor={COLORS.ACCENT5}>
          <Grid item sm={false} lg={4}>
            {/* left gutter */}
          </Grid>

          {isLoading && <Loader />}

          {data?.climateEffects && (
            <Grid
              container
              item
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className={classes.root}
              data-testid="ClimateFeed"
              justify="space-around"
            >
              <Grid item className={classes.feedContainer}>
                <Grid item>
                  <Box mt={2} mb={0} mx={2}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={5}
                    >
                      <Grid item xs={3}>
                        <Logo width="76" data-testid="climate-mind-logo" />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h4">
                          Your Personal Climate Feed
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <ScrollToTopOnMount />
                {data.climateEffects.map((effect, i) => {
                  const preview = effect.effectSolutions[0];
                  return (
                    <Card
                      header={
                        <CardHeader
                          title={effect.effectTitle}
                          preTitle={
                            effect?.isPossiblyLocal ? 'Local impact' : ''
                          }
                          isPossiblyLocal={effect.isPossiblyLocal}
                        />
                      }
                      key={`value-${i}`}
                      index={i}
                      imageUrl={effect.imageUrl}
                      footer={<EffectOverlay effect={effect} />}
                      preview={
                        <CardHeader
                          title={preview.solutionTitle}
                          preTitle={`${preview.solutionType} Action`}
                          bgColor={COLORS.ACCENT2}
                          index={i}
                          cardIcon={preview.solutionType}
                        />
                      }
                    >
                      <Typography variant="body1">
                        {effect.effectShortDescription}
                      </Typography>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
          )}
          <Grid item sm={false} lg={4}>
            {/* right gutter */}
          </Grid>
        </Wrapper>
      </Grid>
      <BottomMenu />
    </>
  );
};

export default ClimateFeed;
