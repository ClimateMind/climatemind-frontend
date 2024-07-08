import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import ROUTES_CONFIG from 'router/RouteConfig';
import { capitalize } from 'helpers/capitalize';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar } from 'features/userB/components';
import { useConversation } from 'features/conversations';

function UserBSharedSuccessPage() {
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

        <CmButton color="userb" text="Create Account" onClick={() => handleCreateAccount()} style={{ margin: 'auto' }} />

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
      </FooterAppBar>
    </Page>
  );
}

export default UserBSharedSuccessPage;
