import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmTypography, Page, PageContent } from 'shared/components';

import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const { loginUserA: loginA, loginGoogleUser } = useLogin();

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

  // useEffect for google authentication
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const emailToken: string = urlParams.get('email_token') ?? '';

    async function fetchGoogleDetails() {
      if (accessToken) {
        setIsLoading(true);
        const isSuccessful = await loginGoogleUser(emailToken);
        if (isSuccessful) {
          navigate(ROUTES.CLIMATE_FEED_PAGE);
        }
        setIsLoading(false);
      }
    }

    fetchGoogleDetails();
  }, [location.search, navigate]);

  const handleGoogleAuth = () => {
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

        <LoginForm isLoading={isLoading} onLogin={handleSubmit} onForgotPasswordClick={() => setShowPasswordResetModal(true)} handleGoogleAuth={handleGoogleAuth} />

        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
      </PageContent>
    </Page>
  );
}

export default LoginPage;

// set dev flag to hide google sign up and login
