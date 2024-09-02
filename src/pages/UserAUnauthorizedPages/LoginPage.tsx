import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';

import ROUTES from 'router/RouteConfig';
import { CmBackButton, Page, PageContent } from 'shared/components';
import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';
import { useMobileView } from 'shared/hooks';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobileView();

  const [isLoading, setIsLoading] = useState(false);
  const { loginUserA: loginA, loginGoogleUser } = useLogin();
  const { sendPasswordResetLink } = useResetPassword();
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  async function handleSubmit(email: string, password: string) {
    setIsLoading(true);
    const isSuccessful = await loginA(email, password);
    if (isSuccessful) {
      navigateAfterLogin();
    }
    setIsLoading(false);
  }

  function navigateAfterLogin() {
    if (location.state && 'from' in location.state) {
      navigate(location.state.from);
    } else {
      navigate(ROUTES.CLIMATE_FEED_PAGE);
    }
  }

  async function handlePasswordReset(email: string) {
    setShowPasswordResetModal(false);
    await sendPasswordResetLink(email);
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const isSuccessful = await loginGoogleUser(credentialResponse);
      if (isSuccessful) {
        navigateAfterLogin();
      } else if (!isSuccessful) {
        navigate(ROUTES.PRE_QUIZ_PAGE);
      }
    } catch (error) {
      console.error('Error in loginGoogleUser:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    /* Initialize Google API client */
    (window as any).google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
  }, []);

  const handleCredentialResponse = (response: any) => {
    const credential = response.credential;
    // Pass the credential to your login function
    handleGoogleSuccess(credential);
  };

  const handleGoogleLogin = () => {
    (window as any).google.accounts.id.prompt(); // Triggers the Google sign-in prompt
  };

  return (
    <Page style={{ background: 'white' }}>
      <PageContent style={{ position: 'relative' }}>
        {isMobile && <CmBackButton onClick={() => navigate(-1)} style={styles.backButton} />}
        <img src="/logos/cm-logo.png" alt="Climate Mind Logo" style={styles.logo} />
        <img src="/logos/slogan.png" alt="Climate Mind Logo" style={styles.slogan} />
        <LoginForm isLoading={isLoading} onLogin={handleSubmit} onForgotPasswordClick={() => setShowPasswordResetModal(true)} onGoogleLogin={handleGoogleLogin} />
        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
      </PageContent>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  logo: {
    height: 66,
    aspectRatio: 62 / 66,
    objectFit: 'contain',
    marginTop: '10%',
  },
  slogan: {
    height: 54,
    aspectRatio: 234 / 54,
    objectFit: 'contain',
    marginTop: 16,
    marginBottom: 64,
  },
};

export default LoginPage;
