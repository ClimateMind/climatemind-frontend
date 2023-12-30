import React from 'react';
import { Box, makeStyles, Grid } from '@material-ui/core';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import { ValueCard } from '../../components/ValueCard/ValueCard';
import { capitalize } from '../../helpers/capitalize';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useSharedValues } from '../../hooks/useSharedValues';
import Error500 from '../SharedPages/Error500Page';
import PrevButton from '../../components/PrevButton';
import { ViewSelectedTopics } from '../../components/ViewSelectedTopics';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { CmTypography } from 'shared/components';

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

function SharedValuesPage() {
  const classes = styles();
  const { data, isLoading, isError } = useSharedValues();
  const { isXs } = useBreakpoint();
  const topSharedValue = data?.valueAlignment?.[0];
  const navigate = useNavigate();
  const location = useLocation();

  const { conversationId } = useParams<UrlParamType>();
  const { conversation } = useGetOneConversation(conversationId ?? '');

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
      navigate(location.state.from, {
        state: { from: location.pathname, id: location.state.id },
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid item xs={3} className={classes.prevButtonContainer}>
          <PrevButton text="Back" clickPrevHandler={handleGoBack} />
        </Grid>

        <PageTitle variant="h1">Your shared core values!</PageTitle>

        <Box>
          <CmTypography variant="h3">
            How do your values align with {` ${capitalize(data?.userBName as string)}'`}s?
          </CmTypography>
        </Box>

        <Box textAlign="center" pb={2}>
          <CmTypography variant="body">
            Understanding your shared core values will help you identify how to
            tackle climate topics and solutions with friends.
          </CmTypography>
        </Box>
        <Box textAlign="center" pb={2}>
          <CmTypography variant="h2">
            Top Shared Core Value
          </CmTypography>
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
          <Box mt={4}>
            <CmTypography variant="h3">Overall Similarity</CmTypography>
            <CmTypography variant="h2">
                {data?.overallSimilarityScore}%
            </CmTypography>
          </Box>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60, marginBottom: 30 }}>
          <ViewSelectedTopics
            conversationState={conversation.state}
            conversationId={conversationId ?? ''}
          />
        </div>
      </div>
    </div>
  );
}

export default SharedValuesPage;
