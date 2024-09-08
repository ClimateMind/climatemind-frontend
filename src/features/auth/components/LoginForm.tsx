import { useState } from 'react';
import { CmButton, CmButton2, CmTextInput, CmTypography } from 'shared/components';

interface Props {
  isLoading: boolean;
  onLogin: (email: string, password: string) => void;
  onForgotPasswordClick: () => void;
}

function LoginForm({ isLoading, onLogin, onForgotPasswordClick }: Props) {
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
      </div>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80vw',
    maxWidth: 300,
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
