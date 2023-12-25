import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

import { ReactComponent as ArrowDown } from '../../assets/icon-arrow-down.svg';
import { Button } from '../../components/Button';
import Card from '../../components/Card/Card';
import CMCardFoldout from '../../components/CardFoldout';
import CardHeader from '../../components/CardHeader';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import PageTitle from '../../components/PageTitle';
import PersonalityChart from '../../components/PersonalityChart';
import ROUTES from '../../router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { useAuth } from '../../hooks/auth/useAuth';
import { useCoreValues } from '../../hooks/useCoreValues';
import { useQuestions } from '../../hooks/useQuestions';
import { useResponses } from '../../hooks/useResponses';
import { useSession } from '../../hooks/useSession';
import Error500 from './Error500Page';

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
    margin: '60px auto',
  },
});

function PersonalValuesPage() {
  const classes = styles();
  const navigate = useNavigate();
  const { personalValues, isLoading, isError } = useCoreValues();

  const { currentSet, setCurrentSet } = useQuestions();

  const { isLoggedIn } = useAuth();
  const { clearSession } = useSession();
  const { dispatch } = useResponses();

  const [retake, setRetake] = useState(false);

  // wait until we have changed the set back to SET_ONE, then do page transition to Questionaire Start
  useEffect(() => {
    if (currentSet === 1 && retake) {
      navigate(ROUTES.QUIZ_PAGE);
    }
  }, [currentSet, retake]);

  // TODO: This logic should be elsewhere  as you can now re-take the quiz from multiple places.
  const handleRetakeQuiz = () => {
    // Clear the session id
    clearSession();
    // Clear the questionnaire responses
    dispatch({ type: 'CLEAR_RESPONSES' });
    setRetake(true);

    if (setCurrentSet && currentSet === 2) {
      setCurrentSet(1);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error500 />;
  }

  return (
    <main>
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* Personal Values Section */}

        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            <PageTitle>This is your Climate Personality</PageTitle>

            <Grid item sm={12} lg={12} container>
              {personalValues?.map((value, i) => (
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
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className={classes.arrowContainer}
              item
              xs={3}
            >
              <ArrowDown width="90px" height="90px" />
            </Grid>
          </PageSection>
        </Wrapper>

        {/* Personal Values Chart */}
        <Wrapper bgColor="white" fullHeight={true}>
          <PersonalityChart />
          {!isLoggedIn && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className={classes.arrowContainer}
              item
              xs={3}
            >
              <ArrowDown width="90px" height="90px" />
            </Grid>
          )}
        </Wrapper>

        {/* Call to action section */}

        <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight={true}>
          <PageSection>
            {!isLoggedIn && (
              <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Box mt={2} mb={4} px={2}>
                    <PageTitle variant="h2">Get started</PageTitle>
                  </Box>
                </Grid>

                <Grid item>
                  <Box mb={3} px={5} textAlign="center">
                    <Typography variant="h6">
                      Explore how climate change impacts you personally and
                      relates to your values <br />
                      <br />
                      Discover climate solutions tailored to you <br />
                      <br />
                      Communicate the realities of climate change to others{' '}
                      <br />
                      <br />
                      Set up your account and dive into effective conversations
                      about climate change
                    </Typography>
                  </Box>
                </Grid>

                <Grid item container justifyContent="center">
                  <Box mt={4} mb={8}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disableElevation
                      onClick={() => navigate(ROUTES.SIGN_UP_PAGE)}
                    >
                      Dive in
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}

            <Grid item container justifyContent="center">
              <Box mt={6} mb={4} px={2} textAlign="center">
                <Typography variant="h6">
                  Not happy with your results?
                </Typography>
                <Box mt={4}>
                  <Button onClick={handleRetakeQuiz} variant="text">
                    Retake Quiz
                  </Button>
                </Box>
              </Box>
            </Grid>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default PersonalValuesPage;
