import { useState } from 'react';
import { CmButton, CmButton2, CmTextInput, CmTypography } from 'shared/components';

interface Props {
  isLoading: boolean;
  onLogin: (email: string, password: string) => void;
  onForgotPasswordClick: () => void;
  handleGoogleAuth?: () => void;
}

function LoginForm({ isLoading, onLogin, onForgotPasswordClick, handleGoogleAuth }: Props) {
  const devMode = localStorage.getItem('devMode') === 'true';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email || !password) return;

    onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CmTextInput id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@climatemind.org" type="email" style={styles.textInput} />

      <CmTextInput id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Super Secret Password" type="password" style={styles.textInput} />

      <div style={styles.passwordResetContainer}>
        <CmTypography variant="body">Forgot your password?</CmTypography>

        <CmButton variant="text" text="Send reset link" onClick={onForgotPasswordClick} style={{ textTransform: 'none' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, gap: 20 }}>
        <CmButton2 text="Log In" type="submit" isLoading={isLoading} disabled={!email || !password} onClick={handleSubmit} />
        {devMode && (
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
        )}
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
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: '20%',
  },
  resetLinkButton: {
    textTransform: 'none',
    textDecoration: 'underline',
    letterSpacing: 0,
    fontWeight: 800,
    paddingTop: 0,
  },
};

export default LoginForm;
