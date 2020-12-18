import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Fab,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import PageWrapper from '../components/PageWrapper';
import ROUTES from '../components/Router/RouteConfig';
import { COLORS } from '../common/styles/CMTheme';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handleSkip = () => {
    console.log('Submitting');
    push(ROUTES.ROUTE_SUBMIT);
  };

  const handleSubmit = () => {
    console.log('Skipping');
    push(ROUTES.ROUTE_SUBMIT);
  };

  return (
    <PageWrapper bgColor={COLORS.GRASS_GREEN}>
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

      <Grid item className={classes.form} container>
        <Grid item xs={10} className={classes.formInput}>
          <Box>
            <TextField
              id="outlined-basic"
              label="What is your Zip Code?"
              placeholder="90210"
              fullWidth={true}
              variant="filled"
              color="primary"
              value={zipCode}
              margin="none"
              onChange={handleInputChange}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Fab color="primary" onClick={handleSubmit}>
            <NavigateNextIcon className={classes.formButton} />
          </Fab>
        </Grid>
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="body1" align="left">
          You don’t have to tell me...
        </Typography>
        <Typography variant="body1" align="left">
          <Button onClick={handleSkip} color="primary">
            Skip Question
          </Button>
        </Typography>
      </Grid>

      <Grid item className={classes.gridItem}>
        <Typography variant="body1" align="left">
          But… just so you know, we won't share your information with anyone it
        </Typography>
      </Grid>
    </PageWrapper>
  );
};

export default GetZipCode;
