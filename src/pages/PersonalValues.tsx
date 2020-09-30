import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, makeStyles, Box } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import ROUTES from '../components/Router/RouteConfig';

import CMCard from '../components/CMCard';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#B8F4FC',
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

// TODO - Replace with values from the api
const climatePersonality = [
  {
    valueDesc:
      'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
    valueName: 'security',
  },
  {
    valueDesc:
      "For you, respect, commitment and acceptance of the customs and ideas that one's culture or religion provides is highly important. It’s likely you practise a form of religious rites and beliefs. You are humble, devout and accepting of your portion in life.",
    valueName: 'tradition',
  },
  {
    valueDesc:
      'You are excellent at restraint of actions, inclinations, and impulses likely to upset or harm others and violate social expectations or norms. Conformity values derive from the requirement that individuals inhibit inclinations that might disrupt and undermine smooth interaction and group functioning. You are obedient, self-disciplined, loyal, responsible and polite.',
    valueName: 'conformity',
  },
];

const PersonalValues: React.FC = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <Grid
      container
      className={classes.root}
      data-testid="MeetGuy"
      justify="space-around"
    >
      <Grid item sm={false} lg={4}>
        {/* left gutter */}
      </Grid>

      <Grid item sm={12} lg={4}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Box mt={2} mb={4} mx={2}>
              <Grid container direction="row" alignItems="center" spacing={3}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">
                    This is your Climate Personality
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item sm={12} lg={4}>
            {climatePersonality.map((value, i) => (
              <CMCard
                key={`value-${i}`}
                title={value.valueName}
                bodyText={value.valueDesc}
              />
            ))}

            {/* {<CMCard />} */}
          </Grid>

          <Grid item sm={12} lg={4}>
            <Box mt={2} mb={3} mx={2} textAlign="center">
              <Typography variant="h6">
                Ready to see how you can take action against climate change?
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box mt={4} mb={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                onClick={() => history.push(ROUTES.ROUTE_VALUES)}
              >
                Yes I’m ready!
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

export default PersonalValues;
