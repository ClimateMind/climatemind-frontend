import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, makeStyles, Box } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import PageWrapper from '../components/PageWrapper';
import ROUTES from '../components/Router/RouteConfig';

const styles = makeStyles({
  typography: {
    textAlign: 'center',
  },
});

const MeetGuy: React.FC<{}> = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <PageWrapper bgColor="#FF9439">
      <Grid item sm={false} lg={4}>
        {/* left gutter */}
      </Grid>

      <Grid item sm={12} lg={4}>
        <Box>
          <Typography variant="h4">Hello there!</Typography>
        </Box>
      </Grid>

      <Grid item>
        <Typography variant="h6">Welcome to Climate Mind.</Typography>
      </Grid>

      <Grid item>
        <Box>
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
        <Box>
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

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
      {/* </Grid> */}
    </PageWrapper>
  );
};

export default MeetGuy;
