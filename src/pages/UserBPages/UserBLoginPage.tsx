import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmTypography, Page, PageContent } from 'shared/components';
import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword, loginUserB } from 'features/auth';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'store/hooks';
import { useToastMessage } from 'shared/hooks';

function UserBLoginPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const { showSuccessToast, showErrorToast } = useToastMessage();
  // Logic for login
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserB: loginB } = useLogin();
  const dispatch = useAppDispatch();

  async function handleSubmit(email: string, password: string) {
    setIsLoading(true);
    const isSuccessful = await loginB(email, password);
    if (isSuccessful) navigate(ROUTES.USERB_CORE_VALUES_PAGE + '/' + conversationId);
    setIsLoading(false);
  }

  // Logic for password reset
  const { sendPasswordResetLink } = useResetPassword();
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get('access_token');
    const first_name = Cookies.get('first_name');
    const last_name = Cookies.get('last_name');
    const email = Cookies.get('user_email');
    const user_id = Cookies.get('user_uuid');
    const quiz_id = Cookies.get('quiz_id');
    const successMessage = urlParams.get('message');
    const userNotFoundMessage = urlParams.get('user_not_found');

    if (access_token) {
      Cookies.set('accessToken', access_token, { secure: true });
      dispatch(
        loginUserB({
          firstName: first_name as string,
          lastName: last_name as string,
          email: email as string,
          quizId: quiz_id as string,
          userId: user_id as string,
        })
      );

      if (successMessage) {
        showSuccessToast(successMessage);
      }
      navigate(ROUTES.USERB_CORE_VALUES_PAGE + '/' + conversationId);
    } else {
      if (userNotFoundMessage) {
        showErrorToast(userNotFoundMessage);
      }
      console.error('No access token found');
    }
  }, [location.search, dispatch]);

  async function handlePasswordReset(email: string) {
    setShowPasswordResetModal(false);
    await sendPasswordResetLink(email);
  }

  const handleGoogleAuth = () => {
    // Redirect to Google OAuth2 login endpoint
    //need to set isloggedin to true so that the user is redirected to the climate feed page, set up a google auth redux userA slice

    window.location.href = `${process.env.REACT_APP_API_URL}/login/google?conversationid=${conversationId}`;
  };

  return (
    <Page>
      <PageContent>
        <img src="/login-page-cm-logo.svg" alt="Climate Mind Logo" style={{ maxWidth: '110px', margin: 'auto' }} />
        <CmTypography variant="h1" style={{ marginTop: '10vh' }}>
          Climate Mind
        </CmTypography>
        <CmTypography variant="h3">Sign In</CmTypography>
        <LoginForm isLoading={isLoading} onLogin={handleSubmit} onCancel={() => navigate(-1)} onForgotPasswordClick={() => setShowPasswordResetModal(true)} />
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

export default UserBLoginPage;
