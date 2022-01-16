import React from 'react';
import {
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import ROUTES_CONFIG from '../../components/Router/RouteConfig';
import { ValueCard } from '../../components/ValueCard/ValueCard';
import { useSharedValues } from '../../hooks/useSharedValues';
import Error500 from '../Error500';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: COLORS.ACCENT12,
    },
    typography: {
      textAlign: 'center',
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
  };
});

export const SharedValues: React.FC = () => {
  const classes = styles();
  const { sharedValues, isLoading, isError } = useSharedValues();

  const topSharedValue = sharedValues?.alignmentScore?.[0];
  const { overallSimilarityScore, userAName } = sharedValues;
  const { push } = useHistory();

  if (isError) return <Error500 />;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box textAlign="center">
          {isLoading && <Loader />}
          <PageTitle variant="h1">Your shared core values!</PageTitle>
          <Typography variant="subtitle1">Top Shared Core Value</Typography>
        </Box>

        <Box textAlign="center" pb={4}>
          <Typography variant="body1">
            Understanding your shared core values will help you identify how to
            tackle climate topics and solutions with friends.
          </Typography>
        </Box>

        {topSharedValue && (
          <ValueCard
            valueId={topSharedValue.id}
            valueName={topSharedValue.name}
            valueDescription={topSharedValue.description}
            matchPercent={90}
          />
        )}

        <Box textAlign="center" pb={4}>
          <Typography variant="h4">
            How do your values align with {`${userAName}'`}s?
          </Typography>
        </Box>
        <Box textAlign="center" pb={4}>
          <Typography variant="h4">Overall Similarity</Typography>
          <Typography variant="h3">{overallSimilarityScore}</Typography>
        </Box>

        <FooterAppBar bgColor={COLORS.ACCENT10}>
          <Toolbar>
            <Button
              style={{ border: '1px solid #a347ff' }}
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => push(ROUTES_CONFIG.USERB_SHARED_IMPACTS)}
            >
              Next: Shared Impacts
            </Button>
          </Toolbar>
        </FooterAppBar>
      </div>
    </div>
  );
};
