import { Box, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import React, { useState } from 'react';
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
      minHeight: '600px',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      textAlign: 'center',
      maxWidth: '370px',
      minWidth: '288px',
      margin: '20vh auto',
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
  const yPadding = 3; // Padding between boxes
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

  const handleClose = () => {
    setOpen(false);
    copyLink(link);
  };

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div className={classes.container}>
          <Box>
            <Typography variant="h3">Start a conversation</Typography>
          </Box>
          <Box style={{ marginTop: '10px' }}>
            <Typography variant="body2" style={{ fontWeight: 'normal' }}>
              Send a personalized link to the values quiz to a friend or family
              member.
            </Typography>
          </Box>

          <form
            style={{ marginTop: '8vh' }}
            className={classes.form}
            onSubmit={formik.handleSubmit}
          >
            <Grid>
              <Typography variant="body1" className={classes.inputTitle}>
                Name of recipient
              </Typography>
              <Box py={yPadding}>
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
              <Box>
                <Typography
                  style={{
                    marginTop: '-5px',
                    textAlign: 'left',
                    fontWeight: 'normal',
                    fontSize: '0.9em',
                  }}
                  variant="body2"
                >
                  Please make a new link each time you want to speak to a new
                  person.
                </Typography>
              </Box>
            </Grid>
            <Box component="div" textAlign="center" py={yPadding}>
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
