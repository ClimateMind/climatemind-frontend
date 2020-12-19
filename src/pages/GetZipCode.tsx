import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import PageWrapper from '../components/PageWrapper';
import ROUTES from '../components/Router/RouteConfig';
import { COLORS } from '../common/styles/CMTheme';
import { containsInvalidZipChars, isValidZipCode } from '../helpers/zipCodes';
import TextField from '../components/TextInput';

const useStyles = makeStyles(() =>
  createStyles({
    gridItem: {
      width: '100%',
    },
    actionText: {
      marginTop: '-10vh',
    },
    button: {
      margin: '1em 0',
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
    spacing: {
      marginTop: '-20px',
      marginBottom: '20px',
    },
  })
);

const GetZipCode: React.FC<{}> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [zipCode, setZipCode] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setZipCode(value);
    //Input validation
    const isError = containsInvalidZipChars(value);
    setIsInputError(isError);
  };

  const handleSkip = () => {
    console.log('Skipping');
    push(ROUTES.ROUTE_SUBMIT);
  };

  const handleSubmit = () => {
    console.log('Submitting');
    push(ROUTES.ROUTE_SUBMIT);
  };

  // Enable submit when zip code valid
  useEffect(() => {
    const isValidZip = isValidZipCode(zipCode);
    setCanSubmit(isValidZip);
  }, [zipCode]);

  return (
    <PageWrapper bgColor={COLORS.ACCENT1}>
      {/* Page header */}

      <Grid item container spacing={5} alignItems="center">
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
        <Typography variant="body1" align="left">
          Knowing your location will give me a chance to show you solutions in
          your local area and show you local effects.
        </Typography>
      </Grid>

      <Grid item className={classes.form}>
        <Box pb={3}>
          <TextField
            label="Zip code"
            placeholder="90210"
            fullWidth={true}
            variant="filled"
            color="secondary"
            value={zipCode}
            margin="none"
            onChange={handleInputChange}
            error={isInputError}
          />
        </Box>
        <Box component="div" className={classes.submit}>
          <Button
            disabled={!canSubmit}
            color="primary"
            onClick={handleSubmit}
            variant="contained"
          >
            SUBMIT
          </Button>
        </Box>
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="body1" align="center">
          You don’t have to tell me but your feed won’t show local solutions.
        </Typography>
        <Typography variant="body1" align="center">
          <Button onClick={handleSkip} className={classes.skipButton}>
            skip question
          </Button>
        </Typography>
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
