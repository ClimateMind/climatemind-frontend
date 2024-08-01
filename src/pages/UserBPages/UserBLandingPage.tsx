import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar, setUserAName, useRecordUserBVisit } from 'features/userB';
import { useConversation } from 'features/conversations';

function UserBLandingPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const dispatch = useAppDispatch();
  const { sessionId } = useAppSelector((state) => state.auth.userB);
  const { userAName } = useAppSelector((state) => state.userB);

  const { recordUserBVisit } = useRecordUserBVisit();
  const { conversation } = useConversation(conversationId ?? '');

  function onLoginClick() {
    navigate(`${ROUTES.USERB_LOGIN_PAGE}/${conversationId}`);
  }

  useEffect(() => {
    if (sessionId && conversation && conversationId) {
      dispatch(setUserAName(conversation.userA.name));
      recordUserBVisit(conversationId);

      if (conversation.consent) {
        navigate(`${ROUTES.USERB_SHARED_SUCCESS_PAGE}/${conversationId}`);
      }
    }
  }, [sessionId, conversation, conversationId]);

  return (
    <Page style={{ paddingBottom: 200 }}>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant="h1">Climate Mind</CmTypography>
        <img src="/userb-landing-page-cm-logo.svg" alt="Climate Mind Logo" style={{ marginTop: 10, marginBottom: 10 }} />

        <CmTypography variant="h2">{userAName} invited you to take our core values quiz!</CmTypography>

        <CmTypography variant="h4" style={{ margin: 0 }}>
          Talking about climate change is the most effective way to take action.
        </CmTypography>

        <CmTypography variant="body" style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
          We’ll match your core values and personalized climate topics with {userAName}'s to unlock your potential to act together
        </CmTypography>

        <CmTypography variant="h3">Already have an account?</CmTypography>

        <CmButton color="userb" text="Login" onClick={onLoginClick} />
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'} align="center">
        <CmButton color="userb" text="Next: How does ClimateMind work?" onClick={() => navigate(`${ROUTES.USERB_HOW_CM_WORKS_PAGE}/${conversationId}`)} />
      </FooterAppBar>
    </Page>
  );
}

export default UserBLandingPage;
