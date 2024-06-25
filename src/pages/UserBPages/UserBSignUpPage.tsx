import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ROUTES from '../../router/RouteConfig';
import { RegistrationPageOpenEvent, analyticsService } from 'services';
import { useAppSelector } from 'store/hooks';
import { CmTypography, Page, PageContent } from 'shared/components';
import { SignUpForm, useSignUp } from 'features/auth';
// import { User } from '@sentry/react';

function UserBSignUpPage() {
  const signUpId = uuidv4();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);
  const { signUp } = useSignUp();
  const { sessionId, quizId } = useAppSelector((state) => state.auth.userB);

  async function signUpHandler(firstName: string, lastName: string, email: string, password: string) {
    setIsLoading(true);
    const success = await signUp(firstName, lastName, email, password, quizId);
    if (googleAuth && success) {
      console.log('googleAuth route used');
      window.location.href = `${process.env.REACT_APP_API_URL}/login/google`;
    }else if (!googleAuth && success) navigate(ROUTES.CLIMATE_FEED_PAGE);
    navigate(ROUTES.CLIMATE_FEED_PAGE);
    setIsLoading(false);
  }

  useEffect(() => {
    if (sessionId) analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
  }, [signUpId, sessionId]);

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        <CmTypography variant="h1">Create a Climate Mind account</CmTypography>

        <SignUpForm isLoading={isLoading} onSignUp={signUpHandler} onCancel={() => navigate(-1)} setGoogleAuth={setGoogleAuth} />

        <CmTypography variant="body" style={{ textAlign: 'center' }}>
          By creating an account you can access your core values and Climate Feed on any computer. You can share the core values quiz with other friends and see how you relate.
        </CmTypography>
      </PageContent>
    </Page>
  );
}

export default UserBSignUpPage;
