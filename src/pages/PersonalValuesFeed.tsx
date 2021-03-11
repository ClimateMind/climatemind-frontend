import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, makeStyles, Box } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Loader from '../components/Loader';
import ROUTES from '../components/Router/RouteConfig';
import { useSession } from '../hooks/useSession';
import { useResponses } from '../hooks/useResponses';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import Error500 from '../pages/Error500';
import { useClimatePersonality } from '../hooks/useClimatePersonality';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import CMCardFoldout from '../components/CardFoldout';
import Wrapper from '../components/Wrapper';
import Button from '../components/Button';
import { useNoSessionRedirect } from '../hooks/useNoSessionRedirect';
import { useQuestions } from '../hooks/useQuestions';

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
  arrowContainer: {
    margin: '0 auto',
  },
});

const PersonalValues: React.FC = () => {
  const classes = styles();
  const { push } = useHistory();
  const {
    climatePersonality,
    clearPersonality,
    personalValuesError,
    personalValuesLoading,
  } = useClimatePersonality();

  const {currentSet, setCurrentSet} = useQuestions();

  const { clearSession } = useSession();
  const { dispatch } = useResponses();

  const [retake, setRetake] = useState(false);

  useNoSessionRedirect();

  // wait until we have changed the set back to SET_ONE, then do page transition to Questionaire Start
  useEffect(()=>{
    if(currentSet === 1 && retake){
      push(ROUTES.ROUTE_QUIZ);
    }
  },[currentSet, retake]);

  const handleRetakeQuiz = () => {
    // Clear the session id
    clearSession();
    // Clear the questionnaire responses
    dispatch({ type: 'CLEAR_RESPONSES' });
    //Clear personalValues
    clearPersonality();
    setRetake(true);
    
    if(setCurrentSet && currentSet === 2){
      setCurrentSet(1);
    }
    // Redirect back to Questionaire Start
    //push(ROUTES.ROUTE_QUIZ);
  };

  if (personalValuesLoading) {
    return <Loader />;
  }

  if (personalValuesError) {
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

      <Wrapper bgColor="#B8F4FC">
        <Grid item sm={false} lg={4}>
          {/* left gutter */}
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
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
                  <Typography variant="h4">
                    This is your Climate Personality
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item sm={12} lg={12} container>
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
                  imageUrl={
                    process.env.PUBLIC_URL + `personality/${value.id}.gif`
                  }
                  footer={
                    <CMCardFoldout
                      description={value.description}
                    ></CMCardFoldout>
                  }
                >
                  <Typography variant="body1" component="p">
                    {value.shortDescription}
                  </Typography>
                </Card>
              ))}
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>

      {/* Call to action section */}

      <Wrapper bgColor="#CAF7BC" fullHeight={true}>
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
            <Box mt={2} mb={4} px={2}>
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.arrowContainer}
                item
                xs={3}
              >
                <ArrowDown width="90px" height="90px" />
              </Grid>
              <Grid container direction="row" alignItems="center" spacing={5}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">
                    Ready to dive into Climate Mind?
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={6} lg={9}>
            <Box mt={2} mb={3} px={5} textAlign="center">
              <Typography variant="h6">
                You are about to see the effects of climate change and how you
                can take action against it
              </Typography>
            </Box>
          </Grid>

          <Grid item container justify="center">
            <Box mt={4} mb={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                onClick={() => push(ROUTES.ROUTE_LOCATION)}
              >
                Yes, I’m ready!
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid item sm={12} lg={6} container justify="center">
          <Box mt={6} mb={4} px={2} textAlign="center">
            <Typography variant="h6">
              Climate Personality not quite right?
            </Typography>
            <Box mt={4}>
              <Button onClick={handleRetakeQuiz} variant="text">
                Retake the Quiz
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </Grid>
  );
};

export default PersonalValues;
