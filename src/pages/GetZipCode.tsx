import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import PageWrapper from '../components/PageWrapper';
import ROUTES from '../components/Router/RouteConfig';
import { COLORS } from '../common/styles/CMTheme';
import { containsInvalidZipChars, isValidZipCode } from '../helpers/zipCodes';
import TextField from '../components/TextInput';
import { useSession } from '../hooks/useSession';
import Button from '../components/Button';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import useSessionRedirect from '../hooks/useSessionRedirect';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      marginBottom: 0,
    },
    gridItem: {
      width: '100%',
    },
    form: {
      width: '100%',
    },
    formInput: {
      paddingRight: 8,
    },
    formButton: {
      fontSize: 40,
    },
    skipButton: {
      color: COLORS.DK_TEXT,
    },
    submit: {
      textAlign: 'center',
    },
  })
);

const GetZipCode: React.FC<{}> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [zipCodeState, setZipCodeState] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const { setZipCode } = useSession();

  useSessionRedirect();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setZipCodeState(value);
    //Input validation
    const isError = containsInvalidZipChars(value);
    setIsInputError(isError);
  };

  const handleSkip = () => {
    push(ROUTES.ROUTE_SUBMIT);
  };

  const handleSubmit = () => {
    setZipCode(zipCodeState);
    push(ROUTES.ROUTE_SUBMIT);
  };

  // Enable submit when zip code valid
  useEffect(() => {
    const isValidZip = isValidZipCode(zipCodeState);
    setCanSubmit(isValidZip);
  }, [zipCodeState]);

  return (
    <PageWrapper bgColor={COLORS.ACCENT1}>
      {/* Page header */}

      <ScrollToTopOnMount />

      <Grid
        item
        container
        spacing={5}
        alignItems="center"
        className={classes.header}
      >
        <Grid item xs={3}>
          <Logo width="76" data-testid="climate-mind-logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h4">
            Climate change is location dependant.
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Box component="div" mt={-8}>
          <Typography variant="body1" align="left">
            Tailor your results to include impacts affecting your local area by entering your zip code below. (only available for US locations currently)
          </Typography>
        </Box>
      </Grid>

      <Grid item className={classes.form}>
        <Box pb={3}>
          <TextField
            id="zipCodeInput"
            label="Zip code"
            placeholder="90210"
            fullWidth={true}
            variant="filled"
            color="secondary"
            value={zipCodeState}
            margin="none"
            onChange={handleInputChange}
            error={isInputError}
            helperText={isInputError ? 'Invalid Zip Code' : ' '}
          />
        </Box>
        <Box component="div" className={classes.submit}>
          <Button
            id="submitButton"
            disabled={!canSubmit}
            color="primary"
            onClick={handleSubmit}
            variant="contained"
            disableElevation
          >
            SUBMIT
          </Button>
        </Box>
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="body1" align="center">
          If you don't live in the US or don't want local impacts indicated, click below:
        </Typography>
        <Box mt={1}>
          <Typography variant="body1" align="center">
            <Button onClick={handleSkip} className={classes.skipButton}>
              DON'T USE ZIP CODE
            </Button>
          </Typography>
        </Box>
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="body1" align="center">
          But… just so you know, your information won’t be shared with anyone.
        </Typography>
      </Grid>
    </PageWrapper>
  );
};

export default GetZipCode;
