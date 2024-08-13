import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmBackButton, Page, PageContent } from 'shared/components';

import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';

import { useMobileView } from 'shared/hooks';
import Cookies from 'js-cookie';

function LoginPage() {
  // For testing

  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMobileView();

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

    const emailCookie = Cookies.get('user_email');


    async function fetchGoogleDetails() {
      if (accessToken && emailCookie) {
        setIsLoading(true);
        const isSuccessful = await loginGoogleUser(emailCookie);

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
    <Page style={{ background: 'white' }}>
      <PageContent style={{ position: 'relative' }}>
        {isMobile && <CmBackButton onClick={() => navigate(-1)} style={styles.backButton} />}

        <img src="/logos/cm-logo.png" alt="Climate Mind Logo" style={styles.logo} />
        <img src="/logos/slogan.png" alt="Climate Mind Logo" style={styles.slogan} />

        <LoginForm isLoading={isLoading} onLogin={handleSubmit} onForgotPasswordClick={() => setShowPasswordResetModal(true)} handleGoogleAuth={handleGoogleAuth} />

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
