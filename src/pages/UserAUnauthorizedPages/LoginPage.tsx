import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const { loginUserA: loginA } = useLogin();

  async function handleSubmit(email: string, password: string, recaptchaToken: any) {
    setIsLoading(true);
    const isSuccessful = await loginA(email, password, recaptchaToken);
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
    const email = Cookies.get('email');
    const user_id = Cookies.get('user_id');
    const quiz_id = Cookies.get('quiz_id');
    if (access_token) {
      // Cookies.set('accessToken', access_token, { secure: true });
      dispatch(
        loginUserA({
          firstName: first_name || 'Google',
          lastName: last_name || 'User',
          email: email || '',
          quizId: quiz_id || '3sdf3sdf3sdf3sdf3sdf3sdf',
          userId: user_id || '3sdf3sdf3sdf3sdf3sdf3sdf',
        })
      );

      navigate(ROUTES.CLIMATE_FEED_PAGE);
    } else {
      console.error('No access token found');
    }
  }, [location.search]);

  const handleGoogleAuth = () => {
    // Redirect to Google OAuth2 login endpoint
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
        <button onClick={handleGoogleAuth}>Google Auth</button>
        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
      </PageContent>
    </Page>
  );
}

export default LoginPage;
