import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import ROUTES from 'router/RouteConfig';
import { CmButton, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import { useToastMessage } from 'shared/hooks';
import { RequestPasswordResetModal, useLogin, useResetPassword } from 'features/auth';

function LoginPage() {
  const navigate = useNavigate();
  const REACT_APP_RECAPTCHA_SITEKEY = process.env.REACT_APP_RECAPTCHA_SITEKEY ?? '';
  const { showErrorToast } = useToastMessage();

  // Logic for login
  const { loginUserA } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  function handleSubmit(e?: React.FormEvent) {
    if (!email || !password || !recaptchaToken) return;

    e?.preventDefault();
    loginUserA(email, password, recaptchaToken)
      .then(() => {
        navigate(ROUTES.CLIMATE_FEED_PAGE);
      });
  }

  async function onChangeRecaptcha(token: string | null) {
    if (!token) {
      showErrorToast('Token expired, click the recaptcha again!')
    }

    setRecaptchaToken(token);
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

        <form onSubmit={handleSubmit} style={styles.form}>
          <CmTextInput
            id='email'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='hello@climatemind.org'
            type='email'
            style={styles.textInput}
          />

          <CmTextInput
            id='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Super Secret Password'
            type='password'
            style={styles.textInput}
          />

          <div style={styles.passwordResetContainer}>
            <CmTypography variant="body">Forgot your password?</CmTypography>
            <CmButton variant='text' text='Send reset link' onClick={() => setShowPasswordResetModal(true)} style={{ textTransform: 'none' }} />
          </div>

          <ReCAPTCHA sitekey={REACT_APP_RECAPTCHA_SITEKEY} onChange={onChangeRecaptcha} />

          <CmButton text='Log In' disabled={!email || !password || !recaptchaToken} onClick={handleSubmit} style={{ marginTop: 30 }} />
        </form>

        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={handlePasswordReset} />
      </PageContent>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    marginTop: 20,
    maxWidth: 400,
  },
  passwordResetContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    marginTop: 10,
    marginBottom: 30,
  }
};

export default LoginPage;
