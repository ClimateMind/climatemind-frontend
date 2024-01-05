import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import ROUTES from '../../router/RouteConfig';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { useRecordEvents } from '../../hooks/useRecordEvents';
import { useSession } from '../../hooks/useSession';
import { useUserB } from '../../hooks/useUserB';
import Error404 from '../SharedPages/Error404Page';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';

type UrlParamType = {
  conversationId: string;
};

function UserBLandingPage() {
  localStorage.removeItem('alignmentScoresId');

  const navigate = useNavigate();
  const location = useLocation();
  const { resetAppStateForUserB } = useUserB();

  const { conversationId } = useParams<UrlParamType>();
  const { isLoading, isError, conversation } = useGetOneConversation(
    conversationId ?? ''
  );
  const { recordUserBVisit } = useRecordEvents();
  const { sessionId } = useSession();

  useEffect(() => {
    resetAppStateForUserB(conversationId ?? '');
    // eslint-disable-next-line
  }, [conversation]);

  // Conversation is validated, register user b visit. When the api returns get conversation
  useEffect(() => {
    if (conversation && sessionId) {
      recordUserBVisit(conversationId ?? '');
      if (conversation.consent) {
        navigate(`${ROUTES.USERB_SHARED_SUCCESS_PAGE}/${conversationId}`, {
          state: {
            from: location.pathname,
            id: conversationId,
            userAName: conversation?.userA?.name,
          },
        });
      }
    }
    // eslint-disable-next-line
  }, [conversation, sessionId]);

  const handleHowCMWorks = () => {
    navigate(`${ROUTES.USERB_HOW_CM_WORKS_PAGE}/${conversationId}`, {
      state: {
        from: location.pathname,
        id: conversationId,
        userAName: conversation?.userA?.name,
      },
    });
  };

  const handleLogin = () => {
    navigate(`${ROUTES.LOGIN_PAGE}`, {
      state: {
        from: location.pathname,
        to: `${ROUTES.USERB_SHARED_VALUES_PAGE}/${conversationId}`,
        id: conversationId,
      },
    });
  };

  // If the conversation can not be found
  if (isError) return <Error404 />;

  return (
    <Page style={{ paddingBottom: 200 }}>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant="h1">Climate Mind</CmTypography>
        <img src='/userb-landing-page-cm-logo.svg' alt='Climate Mind Logo' style={{ marginTop: 10, marginBottom: 10 }} />

        <CmTypography variant="h2">{conversation?.userA?.name} invited you to take our core values quiz!</CmTypography>

        <CmTypography variant="h4" style={{ margin: 0 }}>
          Talking about climate change is the most effective way to take action.
        </CmTypography>

        <CmTypography variant="body" style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
          We’ll match your core values and personalized climate topics
          with {conversation?.userA?.name}'s to unlock your potential to act together
        </CmTypography>

        <CmTypography variant="h3">Already have an account?</CmTypography>

        <CmButton color='userb' text="Login" onClick={handleLogin} />
      </PageContent>

      <FooterAppBar bgColor={COLORS.ACCENT10} align="center">
        <CmButton color='userb' text="Next: How does ClimateMind work?" disabled={isLoading} onClick={() => handleHowCMWorks()} />
      </FooterAppBar>
    </Page>
  );
}

export default UserBLandingPage;
