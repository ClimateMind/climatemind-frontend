import React from 'react';

import { useHistory } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';

import { COLORS } from '../common/styles/CMTheme';

import { Typography, Button, Grid, makeStyles, Box } from '@material-ui/core';
import Loader from '../components/Loader';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import Error500 from './Error500';
import CardFoldout from '../components/CardFoldout';
import Wrapper from '../components/Wrapper';

const styles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  callToActionSection: {
    minHeight: '100vh',
  },
  typography: {
    textAlign: 'center',
  },
});

const PersonalValues: React.FC = () => {
  const classes = styles();
  const { push } = useHistory();

  if (false) {
    return <Loader />;
  }
  if (false) {
    return <Error500 />;
  }
  return (
    <Grid
      container
      className={classes.root}
      data-testid="PersonalValues"
      justify="space-around"
    >
      {/* Personal Values Section */}

      <Wrapper bgColor={COLORS.ACCENT4}>
        <Grid item sm={false} lg={4}>
          {/* left gutter */}
        </Grid>

        <Grid
          item
          sm={12}
          lg={4}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Box mt={2} mb={4} mx={2}>
              <Grid container direction="row" alignItems="center" spacing={5}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">We’re against fake news.</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* <Grid item sm={12} lg={12} container>
            {climatePersonality.personalValues &&
              climatePersonality.personalValues.map((value, i) => (
                <Card
                  header={
                    <CardHeader
                      title={value.name}
                      index={i}
                      preTitle={`No. ${i + 1}`}
                    />
                  }
                  key={`value-${i}`}
                  index={i}
                  shortDescription={value.shortDescription}
                  imageUrl={
                    process.env.PUBLIC_URL + `personality/${value.id}.gif`
                  }
                  footer={
                    <CardFoldout description={value.description}></CardFoldout>
                  }
                />
              ))}
          </Grid> */}
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </Grid>
  );
};

export default PersonalValues;
