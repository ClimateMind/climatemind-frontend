import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ROUTES from '../../router/RouteConfig';
import { RegistrationPageOpenEvent, analyticsService } from 'services';
import { useAppSelector } from 'store/hooks';
import { CmBackButton, CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { SignUpForm, useSignUp } from 'features/auth';
import { useMobileView } from 'shared/hooks';
import GoogleLogin from 'features/auth/components/GoogleLogin';
import { useLocation } from 'react-router-dom';
function UserBSignUpPage() {
  const signUpId = uuidv4();
  const navigate = useNavigate();
  const isMobile = useMobileView();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();
  const { sessionId, quizId } = useAppSelector((state) => state.auth.userB);

  async function signUpHandler(firstName: string, lastName: string, email: string, password: string) {
    setIsLoading(true);
    const success = await signUp(firstName, lastName, email, password, quizId);
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
  }, [signUpId, sessionId]);

  return (
    <Page style={{ paddingBottom: 100, background: 'white' }}>
      <PageContent style={{ position: 'relative' }}>
        {isMobile && <CmBackButton onClick={() => navigate(-1)} style={styles.backButton} />}

        <CmTypography variant="h1">Welcome to Climate Mind</CmTypography>

        <div style={{ display: 'flex' }}>
          <CmTypography variant="body" style={{ textAlign: 'center' }}>
            Already have an account?
          </CmTypography>
          <CmButton variant="text" text="Login" onClick={() => navigate(ROUTES.LOGIN_PAGE)} style={styles.loginButton} />
        </div>

        <SignUpForm isLoading={isLoading} onSignUp={signUpHandler} />
        <GoogleLogin navigateAfterLogin={navigateAfterLogin} text="Continue With Google" />
      </PageContent>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  loginButton: {
    textTransform: 'none',
    textDecoration: 'underline',
    letterSpacing: 0,
    fontWeight: 800,
    paddingTop: 0,
  },
};

export default UserBSignUpPage;
