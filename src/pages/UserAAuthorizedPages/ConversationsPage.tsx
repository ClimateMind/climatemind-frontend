import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Grid, useMediaQuery } from '@mui/material';

import { buildReactUrl } from '../../api/ClimateApi';
import { APPBAR_HEIGHT, COLORS } from '../../common/styles/CMTheme';
import { ConversationsList } from '../../features/conversations/components/ConversationsList';
import CopyLinkDialog from '../../components/CopyLinkDialog';
import DrawerDashboard from '../../components/DrawerDashboard';
import { generateLinkSchema } from '../../helpers/validationSchemas';
import { useAuth } from '../../hooks/auth/useAuth';
import { useConversations } from '../../hooks/useConversations';
import { SHARE_OPTIONS } from '../../shareSettings';
import ROUTES from '../../router/RouteConfig';
import { CmButton, CmTextInput, CmTypography } from 'shared/components';

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

  // For smartphones, only use a small margin at the top of the page.
  // When used on a computer, it will get more space.
  const topMargin = isXs || isSmall ? '60px auto' : '20vh auto';

  const handleClose = () => {
    setOpen(false);
    navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.root}>
      <section style={styles.section}>
        <div style={{...styles.container, margin: topMargin}}>
          <Box>
            <CmTypography variant="h1">Start a conversation</CmTypography>
          </Box>
          <Box style={{ marginTop: '10px' }}>
            <CmTypography variant="body">
              Create a personalized link for each person you want to talk to.
              Then share it, so they can take the quiz, discover your shared
              values, and pick topics to talk about.
            </CmTypography>
            <br />
            <CmTypography
              variant="body"
              style={{
                fontSize: '0.8em',
                fontWeight: 'bold',
              }}
            >
              We will send you an email when they agree to share their results with you!
            </CmTypography>
          </Box>

          <form
            style={{ ...styles.form, marginTop: '2vh' }}
            onSubmit={formik.handleSubmit}
          >
            <Grid>
              <Box paddingBottom={3}>
                <CmTextInput
                  name="friend"
                  id="friend"
                  label="Name of recipient"
                  placeholder={' Try "Peter Smith" or "Mom"'}
                  value={formik.values.friend}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth={true}
                  variant="filled"
                  style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', }}
                />
              </Box>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <CmButton
                text='Create Link'
                onClick={formik.handleSubmit}
                disabled={!formik.dirty}
              />
            </div>
          </form>
        </div>

        <DrawerDashboard
          bgColor="#B9E6E0"
          drawerTitle="Ongoing Conversations"
          offsetAnchorY={offset}
          spaceToTop={spaceToTop}
        >
          <Grid container justifyContent="center" style={{ backgroundColor: 'lightgray' }}>
            <ConversationsList />
          </Grid>
        </DrawerDashboard>
      </section>
      <CopyLinkDialog
        friend={friendValue}
        link={link}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    backgroundColor: 'white',
    minHeight: '100vh',
  },
  section: {
    minHeight: '580px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
  },
  container: {
    textAlign: 'center',
    maxWidth: '370px',
    minWidth: '288px',
    padding: '0 1em',
  },
  form: {
    width: '100%',
  },
  btnCreateLink: {
    border: 'none',
    backgroundColor: COLORS.DEEP_PURPLE,
    color: 'white',
    fontWeight: 'lighter',
    letterSpacing: '0.2rem',
  },
};

export default ConversationsPage;
