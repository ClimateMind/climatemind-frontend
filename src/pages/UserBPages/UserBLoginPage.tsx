import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';
import { CmTypography, Page, PageContent } from 'shared/components';

function UserBLoginPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  // Logic for login
  const [isLoading, setIsLoading] = useState(false);
  const { loginUserB } = useLogin();

  async function handleSubmit(email: string, password: string, recaptchaToken?: string) {
    setIsLoading(true);
    const isSuccessful = await loginUserB(email, password, recaptchaToken);
    if (isSuccessful) navigate(ROUTES.USERB_CORE_VALUES_PAGE + '/' + conversationId);
    setIsLoading(false);
  }

  // Logic for password reset
  const { sendPasswordResetLink } = useResetPassword();
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  async function handlePasswordReset(email: string) {
    setShowPasswordResetModal(false);
    await sendPasswordResetLink(email);
  };

  return (
    <Page>
      <PageContent>
        <img src='/login-page-cm-logo.svg' alt='Climate Mind Logo' style={{ maxWidth: '110px', margin: 'auto' }} />

        <CmTypography variant="h1" style={{ marginTop: '10vh' }}>Climate Mind</CmTypography>
        <CmTypography variant="h3">Sign In</CmTypography>

        <LoginForm isLoading={isLoading} onLogin={handleSubmit} onCancel={() => navigate(ROUTES.USERB_LANDING_PAGE + '/' + conversationId)} onForgotPasswordClick={() => setShowPasswordResetModal(true)} />

        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
      </PageContent>
    </Page>
  );
}

export default UserBLoginPage;
