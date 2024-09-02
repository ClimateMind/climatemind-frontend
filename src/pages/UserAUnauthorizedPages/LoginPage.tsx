import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import GoogleLogin from 'features/auth/components/GoogleLogin';
import ROUTES from 'router/RouteConfig';
import { CmBackButton, Page, PageContent } from 'shared/components';
import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';
import { useMobileView } from 'shared/hooks';

function LoginPage() {
  const devMode = localStorage.getItem('devMode') === 'true';
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobileView();

  const [isLoading, setIsLoading] = useState(false);
  const { loginUserA: loginA } = useLogin();
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

  return (
    <Page style={{ background: 'white' }}>
      <PageContent style={{ position: 'relative' }}>
        {isMobile && <CmBackButton onClick={() => navigate(-1)} style={styles.backButton} />}
        <img src="/logos/cm-logo.png" alt="Climate Mind Logo" style={styles.logo} />
        <img src="/logos/slogan.png" alt="Climate Mind Logo" style={styles.slogan} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 19, justifyContent: 'center', alignItems: 'center' }}>
          <LoginForm isLoading={isLoading} onLogin={handleSubmit} onForgotPasswordClick={() => setShowPasswordResetModal(true)} />
          <div style={{ borderBottom: '1px solid #0000001A', height: 1, width: 205 }}></div>
          {devMode && <GoogleLogin navigateAfterLogin={navigateAfterLogin} text="Log In With Google" />}
        </div>
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
