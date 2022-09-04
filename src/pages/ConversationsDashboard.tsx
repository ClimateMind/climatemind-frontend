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
import { ReactComponent as DownArrowIcon } from '../assets/icon-arrow-down.svg';
import CMCard from '../components/Card/Card';
import CardHeader from '../components/CardHeader';

const useStyles = makeStyles(() =>
  createStyles({
    root: { paddingTop: '40px', paddingBottom: '50px' },
    section: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.ACCENT7,
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
      paddingBottom: '50px',
    },
    form: {
      width: '100%',
    },
    inputTitle: {
      textAlign: 'left',
      fontWeight: 700,
    },
    title: {
      textAlign: 'left',
      paddingTop: '50px',
    },
    left: {
      textAlign: 'left',
    },
    smallText: {
      fontSize: '0.75em',
    },
    iconArrow: {
      padding: '10px',
    },
    leftButton: {
      float: 'left',
      marginBottom: '5px',
    },
  })
);

export const ConversationsDashBoard: React.FC<{}> = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [friendValue, setFriendValue] = useState('');
  const yPadding = 2; // Padding between boxes
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
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid>
              <Typography variant="h2" className={classes.title}>
                Start a conversation
              </Typography>
              <Typography variant="body1" className={classes.inputTitle}>
                Send a personalized link to the values quiz to a friend or
                family member.
              </Typography>
              <Box py={yPadding}>
                <TextInput
                  name="friend"
                  id="friend"
                  label="Name of recipient"
                  value={formik.values.friend}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Mom"
                  fullWidth={true}
                  error={formik.touched.friend && Boolean(formik.errors.friend)}
                  helperText={formik.touched.friend && formik.errors.friend}
                  variant="filled"
                  color="secondary"
                  margin="none"
                  ref={clipboard.target}
                />
              </Box>
              <Typography variant="body1" className={classes.smallText}>
                Please make a new link each time you want to speak to a new
                person.
              </Typography>
            </Grid>
            <Box component="div" textAlign="center" py={yPadding}>
              <Button
                variant="contained"
                disabled={!(formik.dirty && formik.isValid)}
                color="primary"
                onClick={() => formik.handleSubmit}
                type="submit"
                disableElevation
                data-testid="generate-link-button"
              >
                Create Link
              </Button>
            </Box>
          </form>
          <Typography variant="h3" className={classes.left}>
            While you are waiting...
          </Typography>

          <Typography variant="body1" className={classes.inputTitle}>
            Learn more about climate change and we will send you an email when
            your friend has taken the values quiz.
          </Typography>

          <DownArrowIcon className={classes.iconArrow} />
          <CMCard
            header={<CardHeader title="Katharine Haydoe TED talk" index={2} />}
          >
            <Typography variant="body1" className={classes.left}>
              Katherine Hayhoe studies what climate change means to us in the
              places where we live.
            </Typography>
            <Button variant="text" className={classes.leftButton}>
              LEARN MORE
            </Button>
          </CMCard>
          <CMCard header={<CardHeader title="What is Framing?" index={2} />}>
            <Typography variant="body1" className={classes.left}>
              Social scientists have been increasingly stuyding the science of
              science communication, to better understand what
            </Typography>
            <Button variant="text" className={classes.leftButton}>
              LEARN MORE
            </Button>
          </CMCard>
          <CMCard
            header={
              <CardHeader title="The 4 Pillars of Conversation" index={2} />
            }
          >
            <Typography variant="body1" className={classes.left}>
              The key to productive climate conversations is trying to be
              Relevant, Current, Constructive, Hopeful.
            </Typography>
            <Button variant="text" className={classes.leftButton}>
              LEARN MORE
            </Button>
          </CMCard>
        </div>

        <DrawerDashboard
          bgColor={COLORS.ACCENT13}
          drawerTitle="ongoing conversations"
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
