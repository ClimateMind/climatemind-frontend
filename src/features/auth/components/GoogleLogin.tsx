import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';
import ROUTES from 'router/RouteConfig';
import { CmButton2 } from 'shared/components';
import { useLogin } from '../hooks';
import useToastMessage from '../../../shared/hooks/useToastMessage';

interface Props {
  navigateAfterLogin: () => void;
  text?: string;
}

function GoogleLogin({ navigateAfterLogin, text }: Props) {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const { showErrorToast } = useToastMessage();
  const navigate = useNavigate();
  const { loginGoogleUserA, loginGoogleUserB } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const { conversationId } = useParams();

  const userB = conversationId;

  async function handleGoogleSuccess(credentialResponse: CredentialResponse) {
    setIsLoading(true);
    try {
      // if (userB) {
      //   const isSuccessful = await loginGoogleUserB(credentialResponse);
      //   if (isSuccessful) {
      //     navigate(ROUTES.USERB_CORE_VALUES_PAGE + '/' + conversationId);
      //   } else if (!isSuccessful) {
      //     console.log('UserB not successful');
      //     navigate(ROUTES.USERB_HOW_CM_WORKS_PAGE);
      //     showErrorToast('Please Do The Quiz First');
      //   }
      // } else {
      const isSuccessful = await loginGoogleUserA(credentialResponse);
      if (isSuccessful) {
        navigateAfterLogin();
      } else if (!isSuccessful) {
        navigate(ROUTES.PRE_QUIZ_PAGE);
        // }
      }
    } catch (error) {
      console.error('Error in loginGoogleUser:', error);
    }
    setIsLoading(false);
  }

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
