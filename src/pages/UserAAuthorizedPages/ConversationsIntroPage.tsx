import { useNavigate } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { useSession } from '../../hooks/useSession';
import { StartTalkingEvent, analyticsService } from 'services';
import { CmBulletListItem, CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { useAppSelector } from 'store/hooks';

function ConversationsIntroPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { sessionId } = useSession();

  const handleStartTalking = () => {
    if (sessionId) {
      analyticsService.postEvent(StartTalkingEvent);
    }
    navigate(ROUTES.CONVERSATIONS_PAGE);
  };

  return (
    <Page>
      <PageContent style={{ maxWidth: 400 }}>
        <CmTypography variant='h1'>How to talk about Climate Change</CmTypography>

        <CmTypography variant="body" style={{ marginTop: 30, marginBottom: 20 }}>
          Climate change is a global issue, and your contribution matters!
        </CmTypography>

        {/* SHOW THE REGISTER BUTTON IF USER NOT REGISTERED */}
        {!isLoggedIn ? (
          <CmButton
            text='Register to start talking'
            onClick={() => navigate(ROUTES.SIGN_UP_PAGE)}
          />
        ) : (
          <CmButton
            text='Start a conversation'
            onClick={handleStartTalking}
          />
        )}

        <CmTypography variant="body" style={{ marginTop: 20, marginBottom: 20 }}>
          You don't need to be an expert to talk about climate change. Follow
          these easy steps to start having effective conversations:
        </CmTypography>

        <CmBulletListItem style={{ marginBottom: 5 }} text='Reach out to a friend' />
        <CmBulletListItem style={{ marginBottom: 5 }} text="They'll pick an article to talk about with you" />
        <CmBulletListItem style={{ marginBottom: 5 }} text='Use the article to start a conversation' />
        <CmBulletListItem style={{ marginBottom: 20 }} text='Tell us how it went!' />

        <CmTypography variant="body">
          When you have conversations with others, you take part in a network
          of people around the world who are working together to find
          solutions.
        </CmTypography>
        </PageContent>
    </Page>
  );
}

export default ConversationsIntroPage;
