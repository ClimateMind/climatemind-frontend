import { CredentialResponse } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from 'router/RouteConfig';
import { CmButton2 } from 'shared/components';
import { useLogin } from '../hooks';

function GoogleLogin({ navigateAfterLogin, text }: { navigateAfterLogin: () => void; text?: string }) {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { loginGoogleUser } = useLogin();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const isSuccessful = await loginGoogleUser(credentialResponse);
      if (isSuccessful) {
        navigateAfterLogin();
      } else if (!isSuccessful) {
        navigate(ROUTES.PRE_QUIZ_PAGE);
      }
    } catch (error) {
      console.error('Error in loginGoogleUser:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    /* Initialize Google API client */
    (window as any).google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
  }, []);

  const handleCredentialResponse = (response: any) => {
    const credential = response.credential;
    // Pass the credential to your login function
    handleGoogleSuccess(credential);
  };

  const handleGoogleLogin = () => {
    (window as any).google.accounts.id.prompt(); // Triggers the Google sign-in prompt
  };
  return (
    <CmButton2
      text={text}
      isLoading={isLoading}
      onClick={handleGoogleLogin}
      startIcon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" style={{ width: 24, height: 24 }} />}
      style={{ background: 'white', boxShadow: '0px 2px 3px 0px #0000002B, 0px 0px 3px 0px #00000015', border: 'none' }}
    />
  );
}

export default GoogleLogin;
