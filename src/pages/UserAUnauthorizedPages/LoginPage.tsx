import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { useAuth } from '../../hooks/auth/useAuth';
import { getAppSetting } from '../../getAppSetting';
import { usePasswordResetLink } from '../../hooks/usePasswordResetLink';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import { useToastMessage } from 'shared/hooks';
import { RequestPasswordResetModal } from 'features/auth/components';

function LoginPage() {
  const { login2 } = useAuth();
  const { showErrorToast } = useToastMessage();
  const { logMessage } = useErrorLogging();
  const REACT_APP_RECAPTCHA_SITEKEY = getAppSetting('REACT_APP_RECAPTCHA_SITEKEY');

  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const { sendPasswordResetLink } = usePasswordResetLink();

  const onConfirmPwdResetData = async (email: string) => {
    setShowPasswordResetModal(false);
    await sendPasswordResetLink({ email });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  function handleSubmit(e?: React.FormEvent) {
    if (!email || !password || !recaptchaToken) return;

    e?.preventDefault();
    login2({ email, password, recaptchaToken });
  }

  async function onChange(token: string | null) {
    if (!token) {
      showErrorToast('No token returned, click the recaptcha again!')
      logMessage('No token returned, click the recaptcha again!');
      setRecaptchaToken('');
      return;
    }
    setRecaptchaToken(token);
  }

  return (
    <Page>
      <PageContent>
        <RequestPasswordResetModal isOpen={showPasswordResetModal} onClose={() => setShowPasswordResetModal(false)} onSubmit={onConfirmPwdResetData} />

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

          <ReCAPTCHA sitekey={REACT_APP_RECAPTCHA_SITEKEY} onChange={onChange} />

          <CmButton text='Log In' disabled={!email || !password || !recaptchaToken} onClick={handleSubmit} style={{ marginTop: 30 }} />
        </form>
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
