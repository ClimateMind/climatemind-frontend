import { Box, makeStyles, Typography, Grid } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import { ValueCard } from '../components/ValueCard/ValueCard';
import { capitalize } from '../helpers/capitalize';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useSharedValues } from '../hooks/useSharedValues';
import Error500 from './Error500';
import PrevButton from '../components/PrevButton';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ViewSelectedTopics } from '../components/ViewSelectedTopics';
import { useGetOneConversation } from '../hooks/useGetOneConversation';
import { TLocation } from '../types/Location';

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
      paddingTop: '2em',
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
    prevButtonContainer: {
      height: '24px',
    },
  };
});

type UrlParamType = {
  conversationId: string;
};

export const SharedValues: React.FC = () => {
  const classes = styles();
  const { data, isLoading, isError } = useSharedValues();
  const { isXs } = useBreakpoint();
  const topSharedValue = data?.valueAlignment?.[0];
  const history = useHistory();
  const location = useLocation<TLocation>();

  const { conversationId } = useParams<UrlParamType>();
  const { conversation } = useGetOneConversation(conversationId);

  if (isError) return <Error500 />;

  if (isLoading || !conversation)
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Loader />
        </div>
      </div>
    );

  const handleGoBack = () => {
    if (location.state?.from && location.state?.id) {
      history.push({
        pathname: location.state.from,
        state: { from: location.pathname, id: location.state.id },
      });
    } else {
      history.goBack();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid item xs={3} className={classes.prevButtonContainer}>
          <PrevButton text="Back" clickPrevHandler={handleGoBack} />
        </Grid>

        <PageTitle variant="h1">Your shared core values!</PageTitle>

        <Typography className={classes.subheading} variant="h5">
          Top Shared Core Value
        </Typography>

        <Box textAlign="center" pb={2}>
          <Typography variant="body2">
            Understanding your shared core values will help you identify how to
            tackle climate topics and solutions with friends.
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
              <span data-cy="userBName">
                {` ${capitalize(data?.userBName as string)}'`}s?
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

        <Box mt={8} mb={8}>
          <ViewSelectedTopics
            conversationState={conversation.state}
            conversationId={conversationId}
          />
        </Box>
      </div>
    </div>
  );
};
