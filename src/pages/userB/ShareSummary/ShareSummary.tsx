import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import getSummary from '../../../api/getSummary';
import { postConversationConsent } from '../../../api/postConversationConsent';
import { COLORS, TEXT_COLOR } from '../../../common/styles/CMTheme';
import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
import Loader from '../../../components/Loader';
import PageSection from '../../../components/PageSection';
import PageTitle from '../../../components/PageTitle';
import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
import ScrollToTopOnMount from '../../../components/ScrollToTopOnMount';
import SummaryCard from '../../../components/SummaryCard/SummaryCard';
import Wrapper from '../../../components/Wrapper';
import { capitalize } from '../../../helpers/capitalize';
import { useAlignment } from '../../../hooks/useAlignment';
import { useToast } from '../../../hooks/useToast';
import { useErrorLogging } from '../../../hooks/useErrorLogging';
import { TSummary } from '../../../types/Summary';
import { useUserB } from '../../../hooks/useUserB';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
    },

    topMatchPercent: {
      fontFamily: 'atten-round-new',
      fontSize: '32px',
      fontWeight: 600,
      letterSpacing: '1.6pt',
      color: TEXT_COLOR,
    },
    topMatchValue: {
      letterSpacing: '1pt',
      fontSize: '14px',
      marginBottom: '-0.2em',
    },
    cardTitle: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontSize: '10px',
    },
    cardText: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontSize: '10px',
    },
    typography: {
      textAlign: 'center',
    },
    upper: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontSize: '10px',
      fontWeight: 500,
    },
  })
);

const ShareSummary: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const location = useLocation();
  const { showToast } = useToast();
  const { conversationId } = useUserB();
  const { alignmentScoresId } = useAlignment();
  const [summary, setSummary] = useState({
    userAName: 'your friend',
    topMatchPercent: '0',
    topMatchValue: 'loading',
  } as TSummary);
  const { logError } = useErrorLogging();

  const { data, isLoading, isSuccess } = useQuery(
    ['summary', alignmentScoresId],
    () => {
      if (alignmentScoresId) {
        return getSummary(alignmentScoresId);
      }
    }
  );

  useEffect(() => {
    if (data) {
      setSummary({
        ...data,
      });
    }
  }, [data]);

  const mutateConversationConsent = useMutation(
    (id: string) => postConversationConsent(id),
    {
      onSuccess: (response: { message: string }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(response.message);
        }
        push({
          pathname: `${ROUTES_CONFIG.USERB_SHARED_SUCCESS}/${conversationId}`,
          state: { from: location.pathname, id: conversationId },
        });
      },
      onError: (error: any) => {
        showToast({
          message:
            'Failed to save conversation consent to the db: ' +
            error.response?.data?.error,
          type: 'error',
        });
        logError(error);
      },
    }
  );

  const handleShareWithUserA = () => {
    mutateConversationConsent.mutate(conversationId);
  };

  const handleNotWow = () => {
    push({
      pathname: `${ROUTES_CONFIG.USERB_NO_CONSENT}/${conversationId}`,
      state: {
        from: location.pathname,
        id: conversationId,
        userAName: summary.userAName,
      },
    });
  };

  return (
    <main>
      <ScrollToTopOnMount />
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}

        <Wrapper bgColor={COLORS.SECTION5}>
          <PageSection>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <PageTitle>Sharing is caring!</PageTitle>

                <Box textAlign="center" mb={5}>
                  <Typography variant="subtitle2">
                    Share the impact and solutions you selected with
                    {` ${summary.userAName} `} and let them know which core
                    values you share!
                  </Typography>
                </Box>

                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  className={classes.root}
                  spacing={1}
                >
                  {/* --- first card --- */}
                  <Grid item style={{ width: '100%' }}>
                    <SummaryCard
                      title={
                        <Typography variant="subtitle2">
                          {capitalize(summary.topMatchValue)}
                        </Typography>
                      }
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        spacing={1}
                      >
                        <Grid item>
                          <Typography className={classes.topMatchPercent}>
                            {summary.topMatchPercent}%
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            className={classes.topMatchValue}
                            variant="h5"
                            component="h5"
                          >
                            match
                          </Typography>
                        </Grid>
                      </Grid>
                    </SummaryCard>
                  </Grid>
                  {/* --- impact cards --- */}
                  {data?.sharedImpacts.map((impact, index) => (
                    <Grid item style={{ width: '100%' }} key={index}>
                      <SummaryCard
                        title={
                          <Typography
                            className={classes.cardTitle}
                            variant="h5"
                            component="h5"
                          >
                            Climate Effect
                          </Typography>
                        }
                      >
                        <Typography variant="h5" component="h5">
                          {capitalize(impact)}
                        </Typography>
                      </SummaryCard>
                    </Grid>
                  ))}
                  {/* --- impact cards --- */}
                  {data?.sharedSolutions.map((solution, index) => (
                    <Grid item style={{ width: '100%' }} key={index}>
                      <SummaryCard
                        title={
                          <Typography
                            className={classes.cardTitle}
                            variant="h5"
                            component="h5"
                          >
                            Mitigation Solution
                          </Typography>
                        }
                      >
                        <Typography variant="h5" component="h5">
                          {capitalize(solution)}
                        </Typography>
                      </SummaryCard>
                    </Grid>
                  ))}
                  <Box textAlign="center" mt={5}>
                    <Typography
                      className={classes.topMatchValue}
                      variant="h5"
                      component="h5"
                    >
                      We only share your matching core values, selected impact
                      and solutions with {` ${summary.userAName}`}. No other
                      information, in case you were wondering. :)
                    </Typography>
                  </Box>
                </Grid>

                <FooterAppBar bgColor={COLORS.ACCENT10}>
                  <Button
                    style={{ border: '1px solid #07373B', marginRight: '8px' }}
                    onClick={handleNotWow}
                  >
                    Not Now
                  </Button>

                  <Button
                    variant="contained"
                    data-testid="take-quiz-userb-button"
                    color="primary"
                    disableElevation
                    disabled={!isSuccess}
                    style={{ border: '1px solid #a347ff', marginLeft: '8px' }}
                    onClick={handleShareWithUserA}
                  >
                    Share with {summary.userAName}
                  </Button>
                </FooterAppBar>
              </>
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default ShareSummary;
