import { useState } from 'react';
import { CmButton, CmTextInput } from 'shared/components';
import { useAppSelector } from 'store/hooks';

interface Props {
  isLoading: boolean;
  onCancel?: () => void;
  onSignUp: (firstname: string, lastname: string, email: string, password: string) => void;
}

function SignUpForm({ isLoading, onCancel, onSignUp }: Props) {
  const [firstname, setFirstname] = useState({ value: '', touched: false });
  const [lastname, setLastname] = useState({ value: '', touched: false });
  const [email, setEmail] = useState({ value: '', touched: false });
  const [password, setPassword] = useState({ value: '', touched: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', touched: false });
  const { quizId } = useAppSelector((state) => state.auth.userA);
  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!formIsValid) return;

    onSignUp(firstname.value, lastname.value, email.value, password.value);
  }

  function handleGoogleAuth() {
    //need to set isloggedin to true so that the user is redirected to the climate feed page

    window.location.href = `${process.env.REACT_APP_API_URL}/register/google?quizId=${quizId}`;
  }

  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
  const passwordValid = /^(?=.*[a-zA-Z])(?=.*[\d!"#$£%&'()*+,-.:;<=>?@[\]^_`{|}~]).{8,128}$/.test(password.value);
  const passwordsMatch = password.value === confirmPassword.value;
  const formIsValid = emailValid && passwordValid && passwordsMatch && firstname.value !== '' && lastname.value !== '';

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CmTextInput
        id="firstname"
        label="First Name"
        value={firstname.value}
        onChange={(e) => setFirstname({ value: e.target.value, touched: firstname.touched })}
        onBlur={() => setFirstname({ value: firstname.value, touched: true })}
        error={firstname.touched && !firstname.value}
        helperText={firstname.touched && !firstname.value && 'First name is required'}
        placeholder="John"
        style={styles.textInput}
      />

      <CmTextInput
        id="lastname"
        label="Last Name"
        value={lastname.value}
        onChange={(e) => setLastname({ value: e.target.value, touched: lastname.touched })}
        onBlur={() => setLastname({ value: lastname.value, touched: true })}
        error={lastname.touched && !lastname.value}
        helperText={lastname.touched && !lastname.value && 'Last name is required'}
        placeholder="Smith"
        style={styles.textInput}
      />

      <CmTextInput
        id="email"
        label="Email"
        value={email.value}
        onChange={(e) => setEmail({ value: e.target.value, touched: email.touched })}
        onBlur={() => setEmail({ value: email.value, touched: true })}
        error={email.touched && !email.value}
        helperText={email.touched && !emailValid && 'Invalid email address'}
        placeholder="hello@climatemind.org"
        type="email"
        style={styles.textInput}
      />

      <CmTextInput
        id="password"
        label="Password"
        value={password.value}
        onChange={(e) => setPassword({ value: e.target.value, touched: password.touched })}
        onBlur={() => setPassword({ value: password.value, touched: true })}
        error={password.touched && !passwordValid}
        helperText={password.touched && !passwordValid && 'Invalid Password. Password must be at least 8 characters and contain one number or one special character'}
        placeholder="Super Secret Password"
        type="password"
        style={styles.textInput}
      />

      <CmTextInput
        id="confirmPassword"
        label="Confirm Password"
        value={confirmPassword.value}
        onChange={(e) => setConfirmPassword({ value: e.target.value, touched: confirmPassword.touched })}
        onBlur={() => setConfirmPassword({ value: confirmPassword.value, touched: true })}
        error={confirmPassword.touched && !passwordsMatch}
        helperText={confirmPassword.touched && !passwordsMatch && 'Passwords do not match'}
        placeholder="Confirm Password"
        type="password"
        style={styles.textInput}
      />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        {onCancel && <CmButton text="Cancel" style={{ backgroundColor: 'transparent', borderColor: 'black' }} onClick={onCancel} />}
        <CmButton text="Create Account" isLoading={isLoading} type="submit" disabled={!formIsValid} onClick={handleSubmit} />
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
          Continue With Google
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
};

export default SignUpForm;
