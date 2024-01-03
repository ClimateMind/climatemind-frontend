import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import ROUTES_CONFIG from '../../router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { useAlignment } from '../../hooks/useAlignment';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { TSummary } from '../../types/Summary';
import { useUserB } from '../../hooks/useUserB';
import { useSharedImpacts } from '../../hooks/useSharedImpacts';
import { useSharedSolutions } from '../../hooks/useSharedSolutions';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { TPersonalValue } from '../../types/PersonalValues';
import { ClimateApi } from '../../api/ClimateApi';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmButton, CmTypography } from 'shared/components';
import { UserBShareSummaryCard, UserBShareSummaryImpactCard, UserBShareSummarySolutionCard } from 'features/userB/components';

function UserBSharedSummaryPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { alignmentScoresId, setAlignmentScoresId } = useAlignment();
  const { logError } = useErrorLogging();
  const { impacts } = useSharedImpacts();
  const { solutions } = useSharedSolutions();
  const { conversation } = useGetOneConversation(conversationId ?? '');

  const [data, setData] = useState<TSummary | undefined>(undefined);

  const getData = async () => {
    console.log('useQuery');
    if (alignmentScoresId && alignmentScoresId !== '') {
      console.log('AlignmentScoresId');
      console.log(alignmentScoresId);
      return await new ClimateApi(sessionId, accessToken).getSummary(
        alignmentScoresId
      );
    }
    if (alignmentScoresId === '' && conversationId) {
      console.log('alignmentScoresId is empty');
      const result = await new ClimateApi(
        sessionId,
        accessToken
      ).getOneConversation(conversationId);
      setAlignmentScoresId(result.alignmentScoresId!);
      const testVar = await new ClimateApi(sessionId, accessToken).getSummary(
        result.alignmentScoresId!
      );
      console.log(testVar);
      return testVar;
    }
  };

  const [topSharedValue, setTopSharedValue] = useState<
    TPersonalValue | undefined
  >(undefined);

  useEffect(() => {
    if (alignmentScoresId && alignmentScoresId !== '') {
      new ClimateApi(sessionId, accessToken)
        .getAlignment(alignmentScoresId)
        .then((res) => {
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
    (id: string) =>
      new ClimateApi(sessionId, accessToken).postConversationConsent(id),
    {
      onSuccess: (response: { message: string }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(response.message);
        }
        navigate(`${ROUTES_CONFIG.USERB_SHARED_SUCCESS_PAGE}/${conversationId}`, {
          state: { from: location.pathname, id: conversationId },
        });
      },
      onError: (error: any) => {
        // showToast({
        //   message:
        //     'Failed to save conversation consent to the db: ' +
        //     error.response?.data?.error,
        //   type: 'error',
        // });
        logError(error);
      },
    }
  );

  const handleShareWithUserA = () => {
    mutateConversationConsent.mutate(conversationId ?? '');
  };

  const handleNotNow = () => {
    navigate(`${ROUTES_CONFIG.USERB_NO_CONSENT_PAGE}/${conversationId}`, {
      state: {
        from: location.pathname,
        id: conversationId,
        userAName: data?.userAName,
      },
    });
  };

  const handleCreateAccount = () => {
    navigate(`${ROUTES_CONFIG.USERB_SIGN_UP_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  if (!conversation || !data || !topSharedValue) {
    return <Loader></Loader>;
  }

  return (
    <main>
      <Grid
        container
        style={{ minHeight: '100vh' }}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}

        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            {!hasSharedAlready ? (
              <>
                <CmTypography variant='h1'>Sharing is caring!</CmTypography>

                <Box textAlign="center" mb={5}>
                  <CmTypography variant="h3">
                    Share the impact and solutions you selected with
                    {` ${data.userAName} `} and let them know which core values
                    you share!
                  </CmTypography>
                </Box>
              </>
            ) : (
              <>
                <CmTypography variant='h1'>Share Summary</CmTypography>

                <Box textAlign="center" mb={5}>
                  <CmTypography variant="h3">
                    Here are the topics you shared with
                    {` ${data.userAName}`}.
                  </CmTypography>
                </Box>
              </>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {/* --- first card --- */}
              <div style={{ width: '100%' }}>
                <UserBShareSummaryCard
                  {...data}
                  description={topSharedValue.description}
                />
              </div>
              {/* --- impact cards --- */}
              {data?.sharedImpacts.map((impact, index) => (
                <Grid item style={{ width: '100%' }} key={index}>
                  <UserBShareSummaryImpactCard
                    effectId={
                      impacts?.find((i) => i.effectTitle === impact)
                        ?.effectId!
                    }
                  />
                </Grid>
              ))}
              {/* --- impact cards --- */}
              {data?.sharedSolutions.map((solution, index) => (
                <Grid item style={{ width: '100%' }} key={index}>
                  <UserBShareSummarySolutionCard
                    solutionId={
                      solutions?.find((i) => i.solutionTitle === solution)
                        ?.solutionId!
                    }
                  />
                </Grid>
              ))}
              {!hasSharedAlready ? (
                <Box textAlign="center" mt={5}>
                  <CmTypography variant="body">
                    We only share your matching core values, selected impact and
                    solutions with {` ${data.userAName}`}. No other information,
                    in case you were wondering. :)
                  </CmTypography>
                </Box>
              ) : (
                <></>
              )}
            </div>

            <FooterAppBar bgColor={COLORS.ACCENT10}>
              {!hasSharedAlready ? (
                <>
                  <CmButton
                    text='Not Now'
                    onClick={() => handleNotNow()}
                    style={{ backgroundColor: 'transparent', borderColor: 'black' }}
                  />

                  <CmButton
                    text={`Share with ${data.userAName}`}
                    onClick={() => handleShareWithUserA()}
                  />
                </>
              ) : (
                <>
                  <CmButton
                    text='Create Account'
                    onClick={() => handleCreateAccount()}
                  />
                </>
              )}
            </FooterAppBar>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default UserBSharedSummaryPage;
