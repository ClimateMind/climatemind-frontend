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
import { useBreakpoint } from '../../hooks/useBreakpoint';

const styles = makeStyles((theme) => {
  // Page should be padded by the App bar height
  return {
    root: {
      minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
      backgroundColor: COLORS.ACCENT12,
      paddingTop: theme.mixins.toolbar.minHeight,
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
    subheading: {
      marginBottom: theme.spacing(2),
    },
    score: {
      marginTop: theme.spacing(2),
    },
    footerBar: {
      display: 'flex',
      justifyContent: 'center',
    },
  };
});

export const SharedValues: React.FC = () => {
  const classes = styles();
  const { sharedValues, isLoading, isError } = useSharedValues();
  const { isXs } = useBreakpoint();
  const topSharedValue = sharedValues?.alignmentScore?.[0];
  const { overallSimilarityScore, userAName } = sharedValues;
  const { push } = useHistory();

  if (isError) return <Error500 />;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {isLoading && <Loader />}
        {/* <Box px={0} mx={0} className={classes.topBox}> */}
        <PageTitle variant="h1">Your shared core values!</PageTitle>
        <Typography className={classes.subheading} variant="h5">
          Top Shared Core Value
        </Typography>
        {/* </Box> */}

        <Box textAlign="center" pb={2}>
          <Typography variant="body2">
            Understanding your shared core values will help you identify how to
            tackle climate topics and solutions with friends.
          </Typography>
        </Box>

        {topSharedValue && (
          // Bump top margin on screens abover XS
          <Box mt={isXs ? 0 : 2}>
            <ValueCard
              valueId={topSharedValue.id}
              valueName={topSharedValue.name}
              valueDescription={topSharedValue.description}
              matchPercent={90}
            />
          </Box>
        )}

        <Box textAlign="center" mt={6}>
          <Box>
            <Typography className={classes.subheading} variant="h5">
              How do your values align with {`${userAName}'`}s?
            </Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="h5">Overall Similarity</Typography>
            <Typography className={classes.score} variant="h3">
              {overallSimilarityScore}%
            </Typography>
          </Box>
        </Box>

        <FooterAppBar align="center" bgColor={COLORS.ACCENT10}>
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