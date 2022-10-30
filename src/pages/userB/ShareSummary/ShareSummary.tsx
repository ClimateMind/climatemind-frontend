import {
  Box,
  Button,
  Collapse,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
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
import { useSharedImpacts } from '../../../hooks/useSharedImpacts';
import { useSharedSolutions } from '../../../hooks/useSharedSolutions';
import { SharedImpactsOverlay } from '../SharedImpacts/SharedImpacts';
import { SharedSolutionsOverlay } from '../SharedSolutions/SharedSolutions';
import { TLocation } from '../../../types/Location';
import { useGetOneConversation } from '../../../hooks/useGetOneConversation';
import { getAlignment } from '../../../api/getAlignment';
import { TPersonalValue } from '../../../types/PersonalValues';
import { getOneConversation } from '../../../api/getOneConversation';

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
  const location = useLocation<TLocation>();
  const { showToast } = useToast();
  const { conversationId } = useUserB();
  const { alignmentScoresId, setAlignmentScoresId } = useAlignment();
  const { logError } = useErrorLogging();
  const { impacts } = useSharedImpacts();
  const { solutions } = useSharedSolutions();
  const { conversation } = useGetOneConversation(conversationId);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpanded = () => setIsExpanded(!isExpanded);

  const [data, setData] = useState<TSummary | undefined>(undefined);

  const getData = async () => {
    console.log('useQuery');
    if (alignmentScoresId && alignmentScoresId !== '') {
      console.log('AlignmentScoresId');
      console.log(alignmentScoresId);
      return await getSummary(alignmentScoresId);
    }
    if (alignmentScoresId === '' && conversationId) {
      console.log('alignmentScoresId is empty');
      const result = await getOneConversation(conversationId);
      setAlignmentScoresId(result.alignmentScoresId!);
      const testVar = await getSummary(result.alignmentScoresId!);
      console.log(testVar);
      return testVar;
    }
  };

  const [topSharedValue, setTopSharedValue] = useState<
    TPersonalValue | undefined
  >(undefined);

  useEffect(() => {
    if (alignmentScoresId && alignmentScoresId !== '') {
      getAlignment(alignmentScoresId).then((res) => {
        setTopSharedValue(res.valueAlignment[0]);
      });
    }
  }, [alignmentScoresId]);

  var hasSharedAlready = false;
  if (location.state && location.state.from) {
    if (location.state.from.includes('/shared/')) {
      hasSharedAlready = true;
    }
  }

  if (conversation) {
    if (conversation.state) {
      hasSharedAlready = true;
    }
  }

  useEffect(() => {
    getData().then((res) => setData(res));
    // eslint-disable-next-line
  }, []);

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

  const handleNotNow = () => {
    push({
      pathname: `${ROUTES_CONFIG.USERB_NO_CONSENT}/${conversationId}`,
      state: {
        from: location.pathname,
        id: conversationId,
        userAName: data?.userAName,
      },
    });
  };

  const handleCreateAccount = () => {
    push({
      pathname: `${ROUTES_CONFIG.USERB_ROUTE_REGISTER}/${conversationId}`,
      state: { from: location.pathname, id: conversationId },
    });
  };

  if (!conversation || !data || !topSharedValue) {
    return <Loader></Loader>;
  }

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
            {!hasSharedAlready ? (
              <>
                <PageTitle>Sharing is caring!</PageTitle>

                <Box textAlign="center" mb={5}>
                  <Typography variant="subtitle2">
                    Share the impact and solutions you selected with
                    {` ${data.userAName} `} and let them know which core values
                    you share!
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <PageTitle>Share Summary</PageTitle>

                <Box textAlign="center" mb={5}>
                  <Typography variant="subtitle2">
                    Here are the topics you shared with
                    {` ${data.userAName}`}.
                  </Typography>
                </Box>
              </>
            )}
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
                      {capitalize(data.topMatchValue)}
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
                        {data.topMatchPercent}%
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        className={classes.topMatchValue}
                        variant="h5"
                        component="h5"
                      >
                        match with {data.userAName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box>
                    <Button
                      style={{
                        justifyContent: 'flex-start',
                        marginLeft: '-8px',
                      }}
                      onClick={() => handleToggleExpanded()}
                    >
                      {isExpanded ? 'LESS' : 'MORE'}
                    </Button>
                    <Collapse in={isExpanded} unmountOnExit>
                      <Typography variant="body1">
                        {topSharedValue.hasOwnProperty('description')
                          ? topSharedValue.description
                          : 'Loading ...'}
                      </Typography>
                    </Collapse>
                  </Box>
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
                    <div style={{ paddingLeft: '0', marginLeft: '-15px' }}>
                      <SharedImpactsOverlay
                        impactIri={
                          impacts?.find((i) => i.effectTitle === impact)
                            ?.effectId!
                        }
                        selectAction={<></>}
                      />
                    </div>
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
                    <div style={{ paddingLeft: '0', marginLeft: '-15px' }}>
                      <SharedSolutionsOverlay
                        solutionIri={
                          solutions?.find((s) => s.solutionTitle === solution)
                            ?.solutionId!
                        }
                        selectAction={<></>}
                      />
                    </div>
                  </SummaryCard>
                </Grid>
              ))}
              {!hasSharedAlready ? (
                <Box textAlign="center" mt={5}>
                  <Typography
                    className={classes.topMatchValue}
                    variant="h5"
                    component="h5"
                  >
                    We only share your matching core values, selected impact and
                    solutions with {` ${data.userAName}`}. No other information,
                    in case you were wondering. :)
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
            </Grid>

            <FooterAppBar bgColor={COLORS.ACCENT10}>
              {!hasSharedAlready ? (
                <>
                  <Button
                    style={{
                      border: '1px solid #07373B',
                      marginRight: '8px',
                    }}
                    onClick={() => handleNotNow()}
                  >
                    Not Now
                  </Button>

                  <Button
                    variant="contained"
                    data-testid="take-quiz-userb-button"
                    color="primary"
                    disableElevation
                    style={{
                      border: '1px solid #a347ff',
                      marginLeft: '8px',
                    }}
                    onClick={() => handleShareWithUserA()}
                  >
                    Share with {data.userAName}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    data-testid="take-quiz-userb-button"
                    color="primary"
                    disableElevation
                    style={{
                      border: '1px solid #a347ff',
                      margin: '0 auto',
                      display: 'block',
                    }}
                    onClick={() => handleCreateAccount()}
                  >
                    Create Account
                  </Button>
                </>
              )}
            </FooterAppBar>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default ShareSummary;
