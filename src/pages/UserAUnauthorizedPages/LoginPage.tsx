import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmTypography, Page, PageContent } from 'shared/components';

import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword, loginUserA } from 'features/auth';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'store/hooks';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Logic for login
  const [isLoading, setIsLoading] = useState(false);
  // const { loginUserA } = useLogin();
  const { loginUserA: loginA } = useLogin();

  async function handleSubmit(email: string, password: string) {
    setIsLoading(true);
    const isSuccessful = await loginA(email, password);
    if (isSuccessful) {
      if (location.state && 'from' in location.state) {
        navigate(location.state.from);
      } else {
        navigate(ROUTES.CLIMATE_FEED_PAGE);
      }
    }

    setIsLoading(false);
  }

  // Logic for password reset
  const { sendPasswordResetLink } = useResetPassword();
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  async function handlePasswordReset(email: string) {
    setShowPasswordResetModal(false);
    await sendPasswordResetLink(email);
  }

  // useEffect for google authentification

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get('access_token');
    // const refresh_token = urlParams.get('refresh_token');
    const first_name = Cookies.get('first_name');
    const last_name = Cookies.get('last_name');
    const email = Cookies.get('user_email');
    const user_id = Cookies.get('user_uuid');
    const quiz_id = Cookies.get('quiz_id');

    console.log(first_name, last_name, email, user_id, quiz_id);
    if (access_token) {
      //this sets the access token to be reused in the future
      Cookies.set('accessToken', access_token, { secure: true });
      console.log(first_name, last_name, email, user_id, quiz_id);
      dispatch(
        loginUserA({
          firstName: first_name as string,
          lastName: last_name as string,
          email: email as string,
          quizId: quiz_id as string,
          userId: user_id as string,
        })
      );
      navigate(ROUTES.CLIMATE_FEED_PAGE);
    } else {
      console.error('No access token found');
    }
  }, [location.search, dispatch]);

  const handleGoogleAuth = () => {
    // Redirect to Google OAuth2 login endpoint
    //need to set isloggedin to true so that the user is redirected to the climate feed page, set up a google auth redux userA slice

    window.location.href = `${process.env.REACT_APP_API_URL}/login/google`;
  };

  return (
    <Page>
      <PageContent>
        <img src="/login-page-cm-logo.svg" alt="Climate Mind Logo" style={{ maxWidth: '110px', margin: 'auto' }} />

        <CmTypography variant="h1" style={{ marginTop: '10vh' }}>
          Climate Mind
        </CmTypography>
        <CmTypography variant="h3">Sign In</CmTypography>

        <LoginForm isLoading={isLoading} onLogin={handleSubmit} onForgotPasswordClick={() => setShowPasswordResetModal(true)} />
        <button
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
        </button>
        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
      </PageContent>
    </Page>
  );
}

export default LoginPage;
