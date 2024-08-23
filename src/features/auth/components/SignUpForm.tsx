import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from 'router/RouteConfig';
import { CmButton2, CmTextInput } from 'shared/components';
import { useAppSelector } from 'store/hooks';
import { useLogin } from '../hooks';

interface Props {
  isLoading: boolean;
  onSignUp: (firstname: string, lastname: string, email: string, password: string) => void;
}

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
function SignUpForm({ isLoading, onSignUp }: Props) {
  // For testing
  const devMode = localStorage.getItem('devMode') === 'true';

  const [firstname, setFirstname] = useState({ value: '', touched: false });
  const [lastname, setLastname] = useState({ value: '', touched: false });
  const [email, setEmail] = useState({ value: '', touched: false });
  const [password, setPassword] = useState({ value: '', touched: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', touched: false });
  const { quizId } = useAppSelector((state) => state.auth.userA);
  const { loginUserA: loginA, loginGoogleUser } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!formIsValid) return;

    onSignUp(firstname.value, lastname.value, email.value, password.value);
  }

  function navigateAfterLogin() {
    if (location.state && 'from' in location.state) {
      navigate(location.state.from);
    } else {
      navigate(ROUTES.CLIMATE_FEED_PAGE);
    }
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google login success, credential:', credentialResponse);
    //  setIsLoading(true);
    try {
      const isSuccessful = await loginGoogleUser(credentialResponse);
      console.log('loginGoogleUser result:', isSuccessful);
      if (isSuccessful) {
        navigateAfterLogin();
      } else if (!isSuccessful) {
        console.log(credentialResponse, 'creds');
        navigate(ROUTES.PRE_QUIZ_PAGE);
      }
    } catch (error) {
      console.error('Error in loginGoogleUser:', error);
    }
    //  setIsLoading(false);
  };

  const handleGoogleError = (error: any) => {
    console.error('Google Login Failed:', error);
  };

  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
  const passwordValid = /^(?=.*[a-zA-Z])(?=.*[\d!"#$£%&'()*+,-.:;<=>?@[\]^_`{|}~]).{8,128}$/.test(password.value);
  const passwordsMatch = password.value === confirmPassword.value;
  const formIsValid = emailValid && passwordValid && passwordsMatch && firstname.value !== '' && lastname.value !== '';

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
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

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
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
        />

        {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
          <CmButton2 text="Create Account" isLoading={isLoading} disabled={!formIsValid} onClick={handleSubmit} />
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
              Continue With Google
            </button>
          )}
        </div> */}
      </form>
    </GoogleOAuthProvider>
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
