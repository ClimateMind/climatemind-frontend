import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ROUTES from '../../router/RouteConfig';
import { analyticsService, RegistrationPageOpenEvent } from 'services';
import { useAppSelector } from 'store/hooks';
import { CmTypography, Page, PageContent } from 'shared/components';
import { SignUpForm, useSignUp } from 'features/auth';

function SignUpPage() {
  const signUpId = uuidv4();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();
  const { sessionId, quizId } = useAppSelector(state => state.auth.userA);

  async function signUpHandler(firstname: string, lastname: string, email: string, password: string) {
    setIsLoading(true);
    const success = await signUp(firstname, lastname, email, password, quizId);
    if (success) navigate(ROUTES.CLIMATE_FEED_PAGE);
    setIsLoading(false);
  }

  useEffect(() => {
    if (sessionId) analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
  }, [sessionId, signUpId]);

  return (
    <Page>
      <PageContent>
        <CmTypography variant="h1">Create a Climate Mind account</CmTypography>
        <CmTypography variant="h4" style={{ margin: 0 }}>
          Save your results, see your climate topics, and start talking.
        </CmTypography>

        <SignUpForm isLoading={isLoading} onSignUp={signUpHandler} />
      </PageContent>
    </Page>
  );
}

export default SignUpPage;
