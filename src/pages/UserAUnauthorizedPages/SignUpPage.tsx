import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { analyticsService, RegistrationPageOpenEvent } from 'services';
import { useAppSelector } from 'store/hooks';
import { CmTypography, Page, PageContent } from 'shared/components';
import { SignUpForm, useSignUp } from 'features/auth';
import GoogleLogin from 'features/auth/components/GoogleLogin';

function SignUpPage() {
  const signUpId = uuidv4();
  const navigate = useNavigate();

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();
  const { sessionId, quizId } = useAppSelector((state) => state.auth.userA);

  async function signUpHandler(firstname: string, lastname: string, email: string, password: string) {
    setIsLoading(true);
    const success = await signUp(firstname, lastname, email, password, quizId);
    if (success) navigate(ROUTES.CLIMATE_FEED_PAGE);
    setIsLoading(false);
  }
  function navigateAfterLogin() {
    if (location.state && 'from' in location.state) {
      navigate(location.state.from);
    } else {
      navigate(ROUTES.CLIMATE_FEED_PAGE);
    }
  }
  useEffect(() => {
    if (sessionId) analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
  }, [sessionId, signUpId]);

  return (
    <Page style={{ background: 'white' }}>
      <PageContent>
        <CmTypography variant="h1" style={{ marginTop: 0 }}>
          Create a Climate Mind account
        </CmTypography>

        <CmTypography variant="body" style={{ margin: 0, textAlign: 'center' }}>
          Save your results, see your climate topics, and start talking.
        </CmTypography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 19, justifyContent: 'center', alignItems: 'center' }}>
          <SignUpForm isLoading={isLoading} onSignUp={signUpHandler} />
          <div style={{ borderBottom: '1px solid #0000001A', height: 1, width: 205 }}></div>
          <GoogleLogin navigateAfterLogin={navigateAfterLogin} text="Continue With Google" />
        </div>
      </PageContent>
    </Page>
  );
}

export default SignUpPage;
