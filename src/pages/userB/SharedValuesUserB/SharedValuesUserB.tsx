import {
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { COLORS } from '../../../common/styles/CMTheme';
import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
import Loader from '../../../components/Loader';
import PageTitle from '../../../components/PageTitle';
import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
import { ValueCard } from '../../../components/ValueCard/ValueCard';
import { capitalize } from '../../../helpers/capitalize';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { useSharedValues } from '../../../hooks/useSharedValues';
import Error500 from '../../Error500';
import ScrollToTopOnMount from '../../../components/ScrollToTopOnMount';
import { useUserB } from '../../../hooks/useUserB';

const styles = makeStyles((theme) => {
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
      [theme.breakpoints.down('sm')]: {
        height: '100vh',
      },
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

const SharedValuesUserB: React.FC = () => {
  const classes = styles();
  const { push } = useHistory();
  const location = useLocation();
  const { data, isLoading, isError } = useSharedValues();
  const { conversationId } = useUserB();
  const { isXs } = useBreakpoint();
  const topSharedValue = data?.valueAlignment?.[0];

  if (isError) return <Error500 />;

  if (isLoading)
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Loader />
        </div>
      </div>
    );

  const handleSharedImpacts = () => {
    push({
      pathname: `${ROUTES_CONFIG.USERB_SHARED_IMPACTS}/${conversationId}`,
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <>
      <ScrollToTopOnMount />
      <div className={classes.root}>
        <div className={classes.container}>
          <PageTitle variant="h1">Your shared core values!</PageTitle>

          <Typography className={classes.subheading} variant="h5">
            Top Shared Core Value
          </Typography>

          <Box textAlign="center" pb={2}>
            <Typography variant="body2">
              Understanding your shared core values will help you identify how
              to tackle climate topics and solutions with friends.
            </Typography>
          </Box>

          {topSharedValue ? (
            <Box mt={isXs ? 0 : 2}>
              <ValueCard
                valueId={topSharedValue.id}
                valueName={topSharedValue.name}
                valueDescription={topSharedValue.description}
                matchPercent={topSharedValue.score}
              />
            </Box>
          ) : null}

          <Box textAlign="center" mt={6}>
            <Box>
              <Typography className={classes.subheading} variant="h5">
                How do your values align with
                <span data-cy="userAName">
                  {` ${capitalize(data?.userAName as string)}'`}s?
                </span>
              </Typography>
            </Box>

            <Box mt={4}>
              <Typography variant="h5">Overall Similarity</Typography>
              <Typography className={classes.score} variant="h3">
                <span data-cy="overall-similarity-score">
                  {data?.overallSimilarityScore}
                </span>
                %
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
                onClick={handleSharedImpacts}
              >
                Next: Shared Impacts
              </Button>
            </Toolbar>
          </FooterAppBar>
        </div>
      </div>
    </>
  );
};

export default SharedValuesUserB;
