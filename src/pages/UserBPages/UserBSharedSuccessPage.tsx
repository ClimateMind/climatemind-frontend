import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import ROUTES_CONFIG from 'router/RouteConfig';
import { capitalize } from 'helpers/capitalize';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar } from 'features/userB/components';
import { useConversation } from 'features/conversations';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

function UserBSharedSuccessPage() {
  const isUserBLoggedIn = useSelector((state: RootState) => state.auth.userB.isLoggedIn);
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { conversation } = useConversation(conversationId ?? '');

  function handleCreateAccount() {
    navigate(`${ROUTES_CONFIG.USERB_SIGN_UP_PAGE}/${conversationId}`);
  }

  function handleBackImpacts() {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`);
  }

  function handleSharedTopics() {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_SUMMARY_PAGE}/${conversationId}`);
  }

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        <CmTypography variant="h1">Shared!</CmTypography>

        {conversation && <CmTypography variant="h4">{capitalize(conversation.userA.name)} can now see which values, impacts, and solutions you have in common and will be in touch soon!</CmTypography>}

        <CmButton text="Shared Topics" onClick={handleSharedTopics} style={{ backgroundColor: 'transparent', borderColor: 'black' }} />

        <CloudDoneIcon style={{ fontSize: 200, fill: '#ffffff' }} />

        <CmTypography variant="h3" style={{ margin: 0 }}>
          Until then, why not create your own account?
        </CmTypography>

        <CmTypography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
          Unlock the rest of your core values
        </CmTypography>

        <CmTypography variant="h4" style={{ margin: 0 }}>
          Explore your own personalized climate topics and solutions
        </CmTypography>

        <CmTypography variant="h4" style={{ marginTop: 20, marginBottom: 100 }}>
          Match with even more friends
        </CmTypography>
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'}>
        {!conversation?.consent && (
          <CmButton
            text="Impacts"
            startIcon={<ChevronLeftIcon />}
            onClick={() => handleBackImpacts()}
            style={{
              backgroundColor: 'transparent',
              borderColor: 'black',
            }}
          />
        )}

        {!isUserBLoggedIn && <CmButton color="userb" text="Create Account" onClick={() => handleCreateAccount()} style={{ margin: 'auto' }} />}
      </FooterAppBar>
    </Page>
  );
}

export default UserBSharedSuccessPage;
