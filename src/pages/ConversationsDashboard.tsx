import { Box, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { buildReactUrl } from '../api/apiHelper';
import { APPBAR_HEIGHT, COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import { ConversationsList } from '../components/ConversationsList';
import CopyLinkDialog from '../components/CopyLinkDialog';
import DrawerDashboard from '../components/DrawerDashboard';
import TextInput from '../components/TextInput';
import { generateLinkSchema } from '../helpers/validationSchemas';
import { useAuth } from '../hooks/auth/useAuth';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useConversations } from '../hooks/useConversations';
import { useCopyLink } from '../hooks/useCopyLink';
import { SHARE_OPTIONS } from '../shareSettings';
import ROUTES from '../components/Router/RouteConfig';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: COLORS.PRIMARY,
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
    inputTitle: {
      textAlign: 'left',
      marginBottom: '-20px',
      fontWeight: 700,
    },
    inputBox: {
      backgroundColor: '#FFFFFF',
      borderRadius: '6px',
      paddingTop: '14px',
      textIndent: '10px',
      boxShadow: '0px 10px 20px #C3C3C3',
    },
    btnCreateLink: {
      border: 'none',
      backgroundColor: COLORS.DEEP_PURPLE,
      color: 'white',
      fontWeight: 'lighter',
      letterSpacing: '0.2rem',
      '&:hover': {
        background: '#7a26cd',
        cursor: 'pointer',
      },
    },
    btnDrawerDashboard: {
      '&hover': {
        background: '#d09dfe',
      },
    },
  })
);

export const ConversationsDashBoard: React.FC<{}> = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [friendValue, setFriendValue] = useState('');
  const { isXs, isSm } = useBreakpoint();
  const offset = isSm ? 56 : 0;
  const { addConversation, conversationId } = useConversations();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint) + '/' + conversationId;
  const { copyLink, clipboard } = useCopyLink();

  // if not logged in, redirect to conversations landing
  const { isLoggedIn, isLoading } = useAuth();
  const { push } = useHistory();

  if (!isLoading && !isLoggedIn) {
    push(ROUTES.ROUTE_CONVERSATIONS);
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
    isXs || isSm ? APPBAR_HEIGHT.DENSE + 8 : APPBAR_HEIGHT.NORMAL + 16;

  // For smartphones, only use a small margin at the top of the page.
  // When used on a computer, it will get more space.
  const topMargin = isXs || isSm ? '60px auto' : '20vh auto';

  const handleClose = () => {
    setOpen(false);
    copyLink(link);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div className={classes.container} style={{ margin: topMargin }}>
          <Box>
            <Typography variant="h3">Start a conversation</Typography>
          </Box>
          <Box style={{ marginTop: '10px' }}>
            <Typography
              variant="body2"
              style={{ fontWeight: 'lighter', lineHeight: '1.2em' }}
            >
              Create a personalized link for each person you want to talk to.
              Then share it, so they can take the quiz, discover your shared
              values, and pick topics to talk about.
            </Typography>
            <br />
            <Typography
              variant="body2"
              style={{
                fontWeight: 'lighter',
                fontSize: '0.8em',
                lineHeight: '1.2em',
              }}
            >
              We will send you an email when they agree to share their results
              with you!
            </Typography>
          </Box>

          <form
            style={{ marginTop: '2vh' }}
            className={classes.form}
            onSubmit={formik.handleSubmit}
          >
            <Grid>
              <Typography variant="body1" className={classes.inputTitle}>
                Name of recipient
              </Typography>
              <Box py={3}>
                <TextInput
                  name="friend"
                  id="friend"
                  placeholder={' Try "Peter Smith" or "Mom"'}
                  value={formik.values.friend}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth={true}
                  margin="none"
                  ref={clipboard.target}
                  className={classes.inputBox}
                />
              </Box>
            </Grid>
            <Box component="div" textAlign="center" py={1}>
              <Button
                variant="contained"
                disabled={!formik.dirty}
                onClick={() => formik.handleSubmit}
                type="submit"
                disableElevation
                data-testid="generate-link-button"
                className={classes.btnCreateLink}
              >
                Create Link
              </Button>
            </Box>
          </form>
        </div>

        <DrawerDashboard
          bgColor="#E0C4FE"
          drawerTitle="Ongoing Conversations"
          offsetAnchorY={offset}
          spaceToTop={spaceToTop}
        >
          <Grid container justifyContent="center">
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
};

export default ConversationsDashBoard;
