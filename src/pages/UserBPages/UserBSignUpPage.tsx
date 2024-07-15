import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ROUTES from '../../router/RouteConfig';
import { RegistrationPageOpenEvent, analyticsService } from 'services';
import { useAppSelector } from 'store/hooks';
import { CmTypography, Page, PageContent } from 'shared/components';
import { SignUpForm, useSignUp } from 'features/auth';

function UserBSignUpPage() {
  const signUpId = uuidv4();
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();
  const { sessionId, quizId } = useAppSelector((state) => state.auth.userB);

  async function signUpHandler(firstName: string, lastName: string, email: string, password: string) {
    setIsLoading(true);
    const success = await signUp(firstName, lastName, email, password, quizId);
    if (success) navigate(ROUTES.CLIMATE_FEED_PAGE);
    setIsLoading(false);
  }

  useEffect(() => {
    if (sessionId) analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
  }, [signUpId, sessionId]);

  function handleGoogleAuth() {
    //need to set isloggedin to true so that the user is redirected to the climate feed page

    window.location.href = `${process.env.REACT_APP_API_URL}/register/google?quizId=${quizId}conversationId=${conversationId}`;
  }

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        <CmTypography variant="h1">Create a Climate Mind account</CmTypography>

        <SignUpForm isLoading={isLoading} onSignUp={signUpHandler} onCancel={() => navigate(-1)} />
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

        <CmTypography variant="body" style={{ textAlign: 'center' }}>
          By creating an account you can access your core values and Climate Feed on any computer. You can share the core values quiz with other friends and see how you relate.
        </CmTypography>
      </PageContent>
    </Page>
  );
}

export default UserBSignUpPage;
