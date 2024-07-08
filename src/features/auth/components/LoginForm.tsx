import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { CmButton, CmTextInput, CmTypography } from 'shared/components';
import { useToastMessage } from 'shared/hooks';

interface Props {
  isLoading: boolean;
  onCancel?: () => void;
  onLogin: (email: string, password: string, recaptchaToken?: string) => void;
  onForgotPasswordClick: () => void;
}

function LoginForm({ isLoading, onCancel, onLogin, onForgotPasswordClick }: Props) {
  const REACT_APP_RECAPTCHA_SITEKEY = process.env.REACT_APP_RECAPTCHA_SITEKEY ?? '';
  const { showErrorToast } = useToastMessage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | undefined>();

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email || !password) return;

    onLogin(email, password, recaptchaToken);
  }

  function onChangeRecaptcha(token: string | null) {
    if (!token) showErrorToast('Token expired, click the recaptcha again!');
    setRecaptchaToken(token ?? undefined);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CmTextInput id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@climatemind.org" type="email" style={styles.textInput} />

      <CmTextInput id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Super Secret Password" type="password" style={styles.textInput} />

      <div style={styles.passwordResetContainer}>
        <CmTypography variant="body">Forgot your password?</CmTypography>
        <CmButton variant="text" text="Send reset link" onClick={onForgotPasswordClick} style={{ textTransform: 'none' }} />
      </div>

      <ReCAPTCHA sitekey={REACT_APP_RECAPTCHA_SITEKEY} onChange={onChangeRecaptcha} />

      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', marginTop: 30, alignItems: 'center' }}>
        {onCancel && <CmButton text="Cancel" style={{ backgroundColor: 'transparent', borderColor: 'black' }} onClick={onCancel} />}
        <CmButton text="Log In" type="submit" isLoading={isLoading} disabled={!email || !password || !recaptchaToken} onClick={handleSubmit} />
        <button
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
          Log In
        </button>
      </div>
    </form>
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
  },
};

export default LoginForm;
