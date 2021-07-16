import { Box, Grid, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import ROUTES from '../components/Router/RouteConfig';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { useSessionRedirect } from '../hooks/useSessionRedirect';
import { useBreakpoint } from '../hooks/useBreakpoint';
import PageTitle from '../components/PageTitle';
import TextInput from '../components/TextInput';
import { generateLinkSchema } from '../helpers/validationSchemas';
import { useClipboard } from 'use-clipboard-copy';
import CopyLinkDialog from '../components/CopyLinkDialog';
import { useToast } from '../hooks/useToast';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
    //   minHeight: '100vh',
    },
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
    explainerParagraph: {
      fontFamily: 'atten-round-new',
      fontWeight: 900,
    },
    typography: {
      textAlign: 'center',
    },
    pageHeader: {
      marginTop: '1.3em',
    },
    form: {
      width: '100%',
    },
    inputTitle: {
      textAlign: 'left',
      marginBottom: '-20px',
      fontWeight: 700,
    }
  })
);

const ShareLink: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const { showToast } = useToast();
  const clipboard = useClipboard({
    onSuccess() {
      console.log('Text was copied successfully!');
      showToast({
        message: 'Link was successfully copied',
        type: 'success',
      });
    },
    onError() {
      console.log('Failed to copy text!');
      showToast({
        message: 'Failed to copy link',
        type: 'error',
      });
    }
  });

  const [open, setOpen] = React.useState(false);
  const [friendValue, setFriendValue] = useState('');

  const yPadding = 3; // Padding between boxes

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

  const handleClose = () => {
    setOpen(false);
    if(!clipboard.isSupported()){
      showToast({
        message: 'Copy-to-clipboard not supported by your browser',
        type: 'error',
      });
      return;
    }
    clipboard.copy(friendValue);
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
                  // placeholder="hello@climatemind.org"
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
              >
                Generate Link
              </Button>
            </Box>
          </form>
        </div>
      </section>
      <CopyLinkDialog friend={friendValue} open={open} onClose={handleClose}/>
    </div>
  );
};

export default ShareLink;
