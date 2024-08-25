import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { CredentialResponse } from '@react-oauth/google';
import ROUTES from 'router/RouteConfig';
import { CmBackButton, Page, PageContent } from 'shared/components';
import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';
import { useMobileView } from 'shared/hooks';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginPage() {
  const devMode = localStorage.getItem('devMode') === 'true';
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

  async function handlePasswordReset(email: string) {
    setShowPasswordResetModal(false);
    await sendPasswordResetLink(email);
  }

  function navigateAfterLogin() {
    if (location.state && 'from' in location.state) {
      navigate(location.state.from);
    } else {
      navigate(ROUTES.CLIMATE_FEED_PAGE);
    }
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    // console.log('Google login success, credential:', credentialResponse);
    setIsLoading(true);
    try {
      const isSuccessful = await loginGoogleUser(credentialResponse);
      // console.log('loginGoogleUser result:', isSuccessful);
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

  const handleGoogleError = (error: any) => {
    console.error('Google Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <Page style={{ background: 'white' }}>
        <PageContent style={{ position: 'relative' }}>
          {isMobile && <CmBackButton onClick={() => navigate(-1)} style={styles.backButton} />}

          <img src="/logos/cm-logo.png" alt="Climate Mind Logo" style={styles.logo} />
          <img src="/logos/slogan.png" alt="Climate Mind Logo" style={styles.slogan} />

          <LoginForm isLoading={isLoading} onLogin={handleSubmit} onForgotPasswordClick={() => setShowPasswordResetModal(true)} />
          <div style={{ boxShadow: '0px 3px 7px 0px #0000002B', borderRadius: '35%' }}>{devMode && <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => handleGoogleError} shape="pill" logo_alignment="left" theme="outline" />}</div>
          <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
        </PageContent>
      </Page>
    </GoogleOAuthProvider>
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
