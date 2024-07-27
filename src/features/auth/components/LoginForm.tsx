import { useState } from 'react';
import { CmButton, CmTextInput, CmTypography } from 'shared/components';

interface Props {
  isLoading: boolean;
  onCancel?: () => void;
  onLogin: (email: string, password: string) => void;
  onForgotPasswordClick: () => void;
}

function LoginForm({ isLoading, onCancel, onLogin, onForgotPasswordClick }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email || !password) return;

    onLogin(email, password);
  }

  return (
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
        <CmButton variant='text' text='Send reset link' onClick={onForgotPasswordClick} style={{ textTransform: 'none' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, gap: 20 }}>
        {onCancel && <CmButton text='Cancel' style={{ backgroundColor: 'transparent', borderColor: 'black' }} onClick={onCancel} />}
        <CmButton text='Log In' type='submit' isLoading={isLoading} disabled={!email || !password} onClick={handleSubmit} style={{ marginLeft: 'auto' }} />
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
