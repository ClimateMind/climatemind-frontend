import {
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../common/styles/CMTheme';
// import { useHistory } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { ValueCard } from '../../components/ValueCard/ValueCard';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
// import { useAlignment } from '../hooks/useAlignment';
import { useSharedValues } from '../../hooks/useSharedValues';
import Loader from '../../components/Loader';
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
              onClick={() => console.log('Handle Click')}
            >
              Next: Shared Impacts
            </Button>
          </Toolbar>
        </FooterAppBar>
      </div>
    </div>
  );
};
