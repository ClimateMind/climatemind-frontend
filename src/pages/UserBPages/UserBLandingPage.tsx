import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar, setUserAName, useRecordUserBVisit } from 'features/userB';
import { useConversation } from 'features/conversations';
import { loginUserA } from 'features/auth';
import Cookies from 'js-cookie';

function UserBLandingPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sessionId } = useAppSelector((state) => state.auth.userB);
  const { userAName } = useAppSelector((state) => state.userB);

  const { recordUserBVisit } = useRecordUserBVisit();
  const { conversation } = useConversation(conversationId ?? '');
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const access_token = urlParams.get('access_token');
  //   // const refresh_token = urlParams.get('refresh_token');
  //   const first_name = Cookies.get('first_name');
  //   const last_name = Cookies.get('last_name');
  //   const email = Cookies.get('email');
  //   const user_id = Cookies.get('user_id');
  //   const quiz_id = Cookies.get('quiz_id');

  //   if (access_token) {
  //     //this sets the access token to be reused in the future
  //     Cookies.set('accessToken', access_token, { secure: true });

  //     // when dispatched, the userA slice will be updated with the new user info and loggedin is set to true
  //     // when loggein is true, the user is redirected to the climate feed page using the authorized page and the outlet

  //     dispatch(
  //       loginUserA({
  //         firstName: first_name as string,
  //         lastName: last_name as string,
  //         email: email as string,
  //         quizId: quiz_id as string,
  //         userId: user_id as string,
  //       })
  //     );

  //     navigate(ROUTES.CLIMATE_FEED_PAGE);
  //   } else {
  //     console.error('No access token found');
  //   }
  // }, [location.search]);

  // const handleGoogleAuth = () => {
  //   // need to create an end point for userb to continue with the quiz

  //   window.location.href = `${process.env.REACT_APP_API_URL}/login/google`;
  // };

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

        <CmButton color="userb" text="Login" onClick={() => {}} />
        {/* <button
          onClick={handleGoogleAuth}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: 240,
            height: 42,
            borderRadius: 100,
            background: 'white',
            boxShadow: '0px 2px 3px 0px #0000002B, 0px 0px 3px 0px #00000015',
            border: 'none',
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 500,
            color: '#0000008A',
            marginTop: 40,
            padding: '10px 0',
          }}
        >
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" style={{ width: 24, height: 24 }} />
          Log In with google
        </button> */}
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'} align="center">
        <CmButton color="userb" text="Next: How does ClimateMind work?" onClick={() => navigate(`${ROUTES.USERB_HOW_CM_WORKS_PAGE}/${conversationId}`)} />
      </FooterAppBar>
    </Page>
  );
}

export default UserBLandingPage;
