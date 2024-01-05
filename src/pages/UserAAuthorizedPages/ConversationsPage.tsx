import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMediaQuery } from '@mui/material';

import { buildReactUrl } from '../../api/ClimateApi';
import { APPBAR_HEIGHT } from '../../common/styles/CMTheme';
import { ConversationsList } from '../../features/conversations/components/ConversationsList';
import DrawerDashboard from '../../components/DrawerDashboard';
import { generateLinkSchema } from '../../helpers/validationSchemas';
import { useAuth } from '../../hooks/auth/useAuth';
import { useConversations } from '../../hooks/useConversations';
import { SHARE_OPTIONS } from '../../shareSettings';
import ROUTES from '../../router/RouteConfig';
import { CmButton, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import CopyLinkModal from 'features/conversations/components/CopyLinkModal';

function ConversationsPage() {
  const [open, setOpen] = useState(false);
  const [friendValue, setFriendValue] = useState('');
  const isXs = false;
  const isSmall = useMediaQuery('(max-width:960px)');
  const offset = isSmall ? 56 : 0;
  const { addConversation, conversationId } = useConversations();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;

  // if not logged in, redirect to conversations landing
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  if (!isLoading && !isLoggedIn) {
    navigate(ROUTES.CONVERSATIONS_INTRO_PAGE);
  }

  // Set initial form values and handle submission
  const formik = useFormik({
    initialValues: {
      friend: '',
    },
    validationSchema: generateLinkSchema,
    onSubmit: (values, { resetForm }) => {
      setOpen(true);
      setFriendValue(values.friend);
      // post friend value and generate link from response Id
      addConversation(values.friend);
      resetForm();
    },
  });

  const spaceToTop =
    isXs || isSmall ? APPBAR_HEIGHT.DENSE + 8 : APPBAR_HEIGHT.NORMAL + 16;


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page style={{ backgroundColor: 'white', height: '100%' }}>
      <PageContent style={{ maxWidth: 400 }}>
        <CmTypography variant="h1">Start a conversation</CmTypography>

        <CmTypography variant="body" style={{ textAlign: 'center', marginBottom: 20 }}>
          Create a personalized link for each person you want to talk to.
          Then share it, so they can take the quiz, discover your shared
          values, and pick topics to talk about.
        </CmTypography>

        <CmTypography variant="body" style={{ textAlign: 'center', fontSize: '0.8em', fontWeight: 'bold' }}
        >
          We will send you an email when they agree to share their results with you!
        </CmTypography>

        <CmTextInput
          id="friend"
          label="Name of recipient"
          placeholder={' Try "Peter Smith" or "Mom"'}
          value={formik.values.friend}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth={false}
          style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', marginTop: 30, marginBottom: 30 }}
        />

        <CmButton text='Create Link' onClick={formik.handleSubmit} disabled={!formik.dirty} />

        <DrawerDashboard
          bgColor="#B9E6E0"
          drawerTitle="Ongoing Conversations"
          offsetAnchorY={offset}
          spaceToTop={spaceToTop}
        >
          <ConversationsList />
        </DrawerDashboard>

        <CopyLinkModal isOpen={open} onClose={() => setOpen(false)} userBName={friendValue} link={link} />
      </PageContent>
    </Page>
  );
}

export default ConversationsPage;
