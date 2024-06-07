import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmTypography, Page, PageContent } from 'shared/components';
import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Logic for login
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserA } = useLogin();

  async function handleSubmit(email: string, password: string, recaptchaToken?: string) {
    setIsLoading(true);
    const isSuccessful = await loginUserA(email, password, recaptchaToken);
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

  return (
    <Page>
      <PageContent>
        <img src="/login-page-cm-logo.svg" alt="Climate Mind Logo" style={{ maxWidth: '110px', margin: 'auto' }} />

        <CmTypography variant="h1" style={{ marginTop: '10vh' }}>
          Climate Mind
        </CmTypography>
        <CmTypography variant="h3">Sign In</CmTypography>

        <LoginForm isLoading={isLoading} onLogin={handleSubmit} onForgotPasswordClick={() => setShowPasswordResetModal(true)} />
        <button onClick={() => (window.location.href = `${process.env.REACT_APP_API_URL}/login/google`)}>Google Auth</button>
        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
      </PageContent>
    </Page>
  );
}

export default LoginPage;
