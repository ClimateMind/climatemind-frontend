import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import ROUTES_CONFIG from '../../router/RouteConfig';
import { ValueCard } from '../../components/ValueCard/ValueCard';
import { capitalize } from '../../helpers/capitalize';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useSharedValues } from '../../hooks/useSharedValues';
import Error500 from '../SharedPages/Error500Page';
import { useUserB } from '../../hooks/useUserB';

const styles = makeStyles((theme) => {
  return {
    root: {
      minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
      backgroundColor: 'rgba(138, 213, 204, 0.6)',
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

function UserBSharedValuesPage() {
  const classes = styles();
  const navigate = useNavigate();
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
    navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <PageTitle variant="h1">
            Your shared core values with{' '}
            <span data-cy="userAName">
              {`${capitalize(data?.userAName as string)}`}
            </span>
            !
          </PageTitle>

          <Box textAlign="center" mt={isXs ? -2 : -7} pb={4}>
            <Typography variant="body2">
              Understanding your shared core values will help you identify how
              to tackle climate topics and solutions with{' '}
              <span data-cy="userAName">
                {` ${capitalize(data?.userAName as string)}`}
              </span>
              .
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography className={classes.subheading} variant="h5">
              Top Shared Core Value
            </Typography>
          </Box>

          {topSharedValue ? (
            <Box mt={isXs ? 0 : 2}>
              <ValueCard
                valueId={topSharedValue.id}
                valueName={topSharedValue.name}
                valueDescription={topSharedValue.description}
                matchPercent={topSharedValue.score}
                username={capitalize(data?.userAName as string)}
              />
            </Box>
          ) : null}

          <Box textAlign="center" mt={6} pb={8}>
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
}

export default UserBSharedValuesPage;
