import { Box, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
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
  })
);

const ShareLink: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const yPadding = 3; // Padding between boxes

  const handleShareLink = (friend: string) => {
    console.log({friend});
  }

  // Set initial form values and handle submission
  const formik = useFormik({
    initialValues: {
      friend: '',
    },
    validationSchema: generateLinkSchema,
    onSubmit: (values) => {
      handleShareLink(values.friend);
    },
  });

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div className={classes.container}>
          
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Box py={yPadding}>
              <TextInput
                name="friend"
                id="friend"
                label="Name friend"
                value={formik.values.friend}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                error={formik.touched.friend && Boolean(formik.errors.friend)}
                helperText={formik.touched.friend && formik.errors.friend}
                variant="filled"
                color="secondary"
                margin="none"
              />
            </Box>
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
    </div>
  );
};

export default ShareLink;
