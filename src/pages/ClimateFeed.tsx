import React, { useEffect } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Error500 from '../pages/Error500';
import PageWrapper from '../components/Wrapper';
import CardHeader from '../components/CardHeader';
import EffectOverlay from '../components/EffectOverlay';
import { useClimateFeed } from '../hooks/useClimateFeed';
import { useQueries } from 'react-query';
import { getOneMyth } from '../api/getOneMyth';
import BottomMenu from '../components/BottomMenu';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    padding: 0,
    maxWidth: 527,
    paddingBottom: 56,
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

  // const { data: mythsData, status: mythsStatus } = useQuery('myths', getMyths);
  const mythsIris = ['RCqODufKJse3xkgAny5v5fI', 'RXlELjsOUaVbJqmvO91WFL'];
  const userQueries = useQueries(
    mythsIris.map(myth => {
      return {
        queryKey: ['myth', myth],
        queryFn: () => getOneMyth(myth),
      }
    })
  )

  useEffect(() => {
    console.log('userQueries', userQueries);
  },[userQueries]);

  if (error) {
    return <Error500 />;
  }

  return (
    <PageWrapper bgColor={COLORS.ACCENT5} fullHeight>
      {isLoading && <Loader />}

      {data?.climateEffects && (
        <Grid
          container
          className={classes.root}
          data-testid="ClimateFeed"
          justify="space-around"
        >
          <Grid item sm={12} lg={12} className={classes.feedContainer}>
            {data.climateEffects.map((effect, i) => {
              const preview = effect.effectSolutions[0];
              return (
                <Card
                  header={<CardHeader title={effect.effectTitle} preTitle={'Local impact'} isPossiblyLocal={effect.isPossiblyLocal}/>}
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
      <BottomMenu />
    </PageWrapper>
  );
};

export default ClimateFeed;
