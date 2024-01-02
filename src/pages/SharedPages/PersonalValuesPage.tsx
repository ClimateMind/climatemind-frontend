import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import { ReactComponent as ArrowDown } from '../../assets/icon-arrow-down.svg';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import PersonalityChart from '../../features/conversations/components/PersonalityChart';
import ROUTES from '../../router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { useAuth } from '../../hooks/auth/useAuth';
import { useCoreValues } from '../../hooks/useCoreValues';
import { useQuestions } from '../../hooks/useQuestions';
import { useResponses } from '../../hooks/useResponses';
import { useSession } from '../../hooks/useSession';
import Error500 from './Error500Page';
import { CmButton, CmTypography } from 'shared/components';
import PersonalValueCard from 'features/quiz/components/PersonalValueCard';

function PersonalValuesPage() {
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
        style={{
          flexGrow: 1,
          minHeight: '100vh',
        }}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* Personal Values Section */}

        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            <CmTypography variant='h1'>This is your Climate Personality</CmTypography>

            <Grid item sm={12} lg={12} container>
              {personalValues?.map((value, i) => (
                <div style={{ marginBottom: 20 }}>
                  <PersonalValueCard
                    key={i}
                    nr={i + 1}
                    name={value.name}
                    shortDescription={value.shortDescription}
                    description={value.description}
                  />
                </div>
              ))}
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{
                margin: '60px auto',
              }}
              item
              xs={3}
            >
              <ArrowDown width="90px" height="90px" />
            </Grid>
          </PageSection>
        </Wrapper>

        {/* Personal Values Chart */}
        <Wrapper bgColor="white" fullHeight={true}>
        <Box my={2} mb={4}>
          <CmTypography variant="h1">Your Personal Value Web</CmTypography>
          <PersonalityChart />
        </Box>
          {!isLoggedIn && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{
                margin: '60px auto',
              }}
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
                    <CmTypography variant="h1">Get started</CmTypography>
                  </Box>
                </Grid>

                <Grid item>
                  <Box mb={3} px={5} textAlign="center">
                    <CmTypography variant="body">
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
                    </CmTypography>
                  </Box>
                </Grid>

                <Grid item container justifyContent="center">
                  <Box mt={4} mb={8}>
                    <CmButton
                      text='Dive in'
                      onClick={() => navigate(ROUTES.SIGN_UP_PAGE)}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            <Grid item container justifyContent="center">
              <Box mt={6} mb={4} px={2} textAlign="center">
                <CmTypography variant="h4">
                  Not happy with your results?
                </CmTypography>
                <Box mt={4}>
                  <CmButton
                    variant="text"
                    text='Retake Quiz'
                    onClick={handleRetakeQuiz}
                  />
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
