import { Box, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CMLogo } from '../assets/cm-logo-mint.svg';
import { ReactComponent as UpArrowIcon } from '../assets/icon-arrow-up.svg';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import ROUTES from '../components/Router/RouteConfig';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { useSessionRedirect } from '../hooks/useSessionRedirect';
import { useBreakpoint } from '../hooks/useBreakpoint';
import PageTitle from '../components/PageTitle';

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
      backgroundColor: COLORS.SECONDARY,
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
    bottomText: {
      color: 'white',
    },
    pageHeader: {
      marginTop: '1.3em',
    },
    logo: {
      paddingRight: '0.5em',
    },
    upArrow: {
      marginLeft: '-14px',
    },
    form: {
      width: '100%',
    },
    formInput: {
      paddingRight: 8,
    },
    submit: {
      textAlign: 'center',
    },
  })
);

const ShareLink: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();
  const yPadding = 3; // Padding between boxes

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div className={classes.container}>
          {/* <Box mb={2} mt={5}>
            <PageTitle variant="h1">Woah! Begin a conversation – starting here.</PageTitle>
          </Box>

          <Box textAlign="center">
            <Typography variant="h6">
              Share a link to the personal values survey with a friend or 
              family member to get the conversation started.
            </Typography>
          </Box> */}

          {/* <Box mt={5}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => history.push(ROUTES.ROUTE_QUIZ)}
            >
              Generate Link
            </Button>
          </Box> */}

          <form className={classes.form}>
            <Box py={yPadding}>
              <TextField id="filled-basic" label="Filled" variant="filled" />
              {/* <TextField
                id="generateLinkInput"
                // label="Add their name"
                placeholder="Name to send to"
                fullWidth={true}
                variant="filled"
                color="secondary"
                value={''}
                margin="none"
                // onChange={handleInputChange}
                // error={isInputError}
                helperText={'text'}
              /> */}
            </Box>
            <Box component="div" className={classes.submit} py={yPadding}>
              <Button
                id="submitButton"
                // disabled={!canSubmit}
                color="primary"
                // onClick={handleSubmit}
                variant="contained"
                disableElevation
              >
                Generate Link
              </Button>
            </Box>
          </form>

          {/* <Box textAlign="center">
            <Typography variant="h6">
              And share with however you chat with your friend
            </Typography>
          </Box> */}
        </div>
      </section>
    </div>
  );
};

export default ShareLink;
