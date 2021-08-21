import { Box, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { buildReactUrl } from '../api/apiHelper';
import { APPBAR_HEIGHT, COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import ConversationsCard from '../components/ConversationCard';
import CopyLinkDialog from '../components/CopyLinkDialog';
import DrawerDashboard from '../components/DrawerDashboard';
import TextInput from '../components/TextInput';
import { generateLinkSchema } from '../helpers/validationSchemas';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useConversations } from '../hooks/useConversations';
import { useToast } from '../hooks/useToast';
import { SHARE_OPTIONS } from '../shareSettings';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    section: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
      justify: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.ACCENT7,
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
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
  })
);

export const ConversationsDashBoard: React.FC<{}> = () => {
  const classes = useStyles();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [friendValue, setFriendValue] = useState('');
  const { conversations } = useConversations();
  const link = buildReactUrl(SHARE_OPTIONS.endpoint);
  const yPadding = 3; // Padding between boxes
  const { isXs, isSm } = useBreakpoint();
  const offset = isXs ? 56 : 0;

  const clipboard = useClipboard({
    onSuccess() {
      showToast({
        message: 'Link was successfully copied',
        type: 'success',
      });
    },
    onError() {
      showToast({
        message: 'Failed to copy link',
        type: 'error',
      });
    },
  });

  // Set initial form values and handle submission
  const formik = useFormik({
    initialValues: {
      friend: '',
    },
    validationSchema: generateLinkSchema,
    onSubmit: (values) => {
      setOpen(true);
      setFriendValue(values.friend);
    },
  });

  const spaceToTop =
    isXs || isSm ? APPBAR_HEIGHT.DENSE + 8 : APPBAR_HEIGHT.NORMAL + 16;

  const handleClose = () => {
    setOpen(false);
    if (!clipboard.isSupported()) {
      showToast({
        message: 'Copy-to-clipboard not supported by your browser',
        type: 'error',
      });
      return;
    }
    // clipboard.copy(friendValue);
    clipboard.copy(link);
  };

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div className={classes.container}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid>
              <Typography variant="body1" className={classes.inputTitle}>
                Add their name
              </Typography>
              <Box py={yPadding}>
                <TextInput
                  name="friend"
                  id="friend"
                  label="Name to send to"
                  value={formik.values.friend}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder=""
                  fullWidth={true}
                  error={formik.touched.friend && Boolean(formik.errors.friend)}
                  helperText={formik.touched.friend && formik.errors.friend}
                  variant="filled"
                  color="secondary"
                  margin="none"
                  ref={clipboard.target}
                />
              </Box>
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
                Generate Link
              </Button>
            </Box>
          </form>
        </div>
        <DrawerDashboard
          bgColor={COLORS.ACCENT8}
          drawerTitle="conversations"
          offsetAnchorY={offset}
          spaceToTop={spaceToTop}
        >
          {conversations.map((conversation) => (
            <ConversationsCard conversation={conversation} />
          ))}
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
