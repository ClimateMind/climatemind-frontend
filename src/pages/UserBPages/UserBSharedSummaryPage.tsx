import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';

import { COLORS } from '../../common/styles/CMTheme';
import ROUTES_CONFIG from '../../router/RouteConfig';
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
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { UserBShareSummaryCard, UserBShareSummaryImpactCard, UserBShareSummarySolutionCard, FooterAppBar } from 'features/userB/components';

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

  function findEffect(effectId: string) {
    return impacts?.find((i) => i.effectTitle === effectId)?.effectId!
  }

  function findSolution(solutionId: string) {
    return solutions?.find((i) => i.solutionTitle === solutionId)?.solutionId!
  }

  if (!conversation || !data || !topSharedValue) {
    return <CmLoader />;
  }

  return (
    <Page>
      <PageContent style={{ paddingBottom: 200 }}>
        {!hasSharedAlready && (
          <>
            <CmTypography variant='h1'>Sharing is caring!</CmTypography>

            <CmTypography variant="h4">
              Share the impact and solutions you selected with {data.userAName} and
              let them know which core values you share!
            </CmTypography>
          </>
        )}

        {hasSharedAlready && (
          <>
            <CmTypography variant='h1'>Share Summary</CmTypography>
            <CmTypography variant="h4">Here are the topics you shared with {data.userAName}.</CmTypography>
          </>
        )}

        <div style={{ width: '100%', marginTop: 30, marginBottom: 10 }}>
          <UserBShareSummaryCard {...data} description={topSharedValue.description} />
        </div>

        {data?.sharedImpacts.map((impact) => (
          <div style={{ width: '100%', marginBottom: 10 }}>
            <UserBShareSummaryImpactCard key={findEffect(impact)} effectId={findEffect(impact)} />
          </div>
        ))}

        {data?.sharedSolutions.map((solution) => (
          <div style={{ width: '100%', marginBottom: 10 }}>
            <UserBShareSummarySolutionCard key={findSolution(solution)} solutionId={findSolution(solution)} />
          </div>
        ))}

        {!hasSharedAlready && (
          <CmTypography variant="body" style={{ marginTop: 30, textAlign: 'center' }}>
            We only share your matching core values, selected impact and
            solutions with {data.userAName}. No other information,
            in case you were wondering. :)
          </CmTypography>
        )}
      </PageContent>

      <FooterAppBar bgColor={COLORS.ACCENT10}>
        {!hasSharedAlready && (
          <>
            <CmButton text='Not Now' onClick={() => handleNotNow()} style={{ backgroundColor: 'transparent', borderColor: 'black' }} />
            <CmButton color='userb' text={`Share with ${data.userAName}`} onClick={() => handleShareWithUserA()} />
          </>
        )}
        {hasSharedAlready && <CmButton text='Create Account' onClick={() => handleCreateAccount()} />}
      </FooterAppBar>
    </Page>
  );
};

export default UserBSharedSummaryPage;
