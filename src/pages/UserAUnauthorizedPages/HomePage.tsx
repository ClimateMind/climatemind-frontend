import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { GetStartedButtonEvent, LoginButtonEvent, analyticsService } from 'services';
import { CmButton, CmTypography, Page, PageContent, PageSection } from 'shared/components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setHasAcceptedCookies } from 'store/globalSlice';

function HomePage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const hasAcceptedCookies = useAppSelector(state => state.global.hasAcceptedCookies);
  const { sessionId } = useAppSelector(state => state.auth);

  const handleGettingStarted = () => {
    if (sessionId && hasAcceptedCookies) {
      analyticsService.postEvent(GetStartedButtonEvent);
      navigate(ROUTES.PRE_QUIZ_PAGE);
    } else {
      dispatch(setHasAcceptedCookies(undefined));
    }
  };

  const handleLoginClick = () => {
    if (sessionId && hasAcceptedCookies) {
      analyticsService.postEvent(LoginButtonEvent);
    }
    navigate(ROUTES.LOGIN_PAGE);
  };

  return (
    <Page>
      <PageSection>
        <PageContent>
          <img src='/home-page-cm-logo.svg' alt='cm logo' style={{ maxWidth: '110px' }} />
          <CmTypography variant="h1">Inspire others to take action!</CmTypography>

          <CmButton text='Get Started' onClick={handleGettingStarted} style={{ marginTop: 30, marginBottom: 10 }} />
          <CmButton variant='text' text='Already a Member? Login Here' onClick={handleLoginClick} />

          <CmTypography variant='body' style={{ marginTop: 50, marginBottom: 20, textAlign: 'center' }}>
            Climate change affects us all. And to inspire sufficient action, we
            must talk about it much more.
          </CmTypography>

          <CmTypography variant='body' style={{ textAlign: 'center' }}>
            Climate Mind makes it easy to have effective conversations with your
            friends and family.
          </CmTypography>
        </PageContent>
      </PageSection>

      <PageSection style={{ backgroundColor: '#07373b' }}>
        <PageContent style={{ paddingTop: 30 }}>
          <CmTypography variant='body' style={{ color: 'white', textAlign: 'center' }}>
            We use proven social science to connect climate change to what
            people care about and help find solutions they like.
          </CmTypography>

          <img src='/home-page-connect-the-dots.svg' alt='connect the dots' style={{ marginTop: 30 }} />
          <img src='/arrows/arrow-up.svg' alt='arrow up' style={{ marginTop: 30 }} />
        </PageContent>
      </PageSection>
    </Page>
  );
}

export default HomePage;
