import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, makeStyles, Box } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import ROUTES from '../components/Router/RouteConfig';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#FF9439',
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const MeetGuy: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <Grid container className={classes.root} data-testid="MeetGuy">
      <Grid item sm={false} lg={4}>
        {/* left gutter */}
      </Grid>

      <Grid item sm={12} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Box mt={12} mb={14}>
              <Typography variant="h4">Hello there!</Typography>
            </Box>
          </Grid>

          <Grid item>
            <Typography variant="h6">Welcome to Climate Mind.</Typography>
          </Grid>

          <Grid item>
            <Box mt={4} mb={10}>
              <Logo data-testid="climate-mind-logo" />
            </Box>
          </Grid>

          <Grid item>
            <Box pr={10} pl={10}>
              <Typography className={classes.typography}>
                I’ll help you find out your Climate Personality to give you
                personalised solutions to climate change.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box mt={4} mb={8}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => history.push(ROUTES.ROUTE_PERSONALITY)}
              >
                Let's Go!
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
    </Grid>
  );
};

export default MeetGuy;
