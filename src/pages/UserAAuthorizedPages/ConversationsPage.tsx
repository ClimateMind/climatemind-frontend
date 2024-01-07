import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { buildReactUrl } from '../../api/ClimateApi';
import { generateLinkSchema } from '../../helpers/validationSchemas';
import { useAuth } from '../../hooks/auth/useAuth';
import { useConversations } from '../../hooks/useConversations';
import { SHARE_OPTIONS } from '../../shareSettings';
import ROUTES from '../../router/RouteConfig';
import { CmButton, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import CopyLinkModal from 'features/conversations/components/CopyLinkModal';
import { ConversationsDrawer } from 'features/conversations/components';
import { useMediaQuery } from '@mui/material';

function ConversationsPage() {
  const [open, setOpen] = useState(false);
  const [friendValue, setFriendValue] = useState('');
  const { addConversation, conversationId } = useConversations();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const isSmall = useMediaQuery('(max-width: 960px)');

  const [drawerOpen, setDrawerOpen] = useState(false);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page style={{ backgroundColor: 'white', height: '100%' }}>
      <PageContent style={{ maxWidth: 400, paddingBottom: 0, height: '100%' }}>
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

        <button onClick={() => setDrawerOpen(true)} style={{ ...styles.openDrawerButton, bottom: isSmall ? 56 : 0 }}>
          <img src='/arrows/arrow-up-white.svg' alt='arrow-up' />
          <CmTypography variant='h4' style={{ margin: 0 }}>Ongoing Conversations</CmTypography>
        </button>
        <ConversationsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <CopyLinkModal isOpen={open} onClose={() => setOpen(false)} userBName={friendValue} link={link} />
      </PageContent>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  openDrawerButton: {
    backgroundColor: '#D0EEEB',
    border: 'none',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100vw',
    height: 88,
  },
};

export default ConversationsPage;
