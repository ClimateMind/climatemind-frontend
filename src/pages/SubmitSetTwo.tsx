import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { submitScores } from '../api/postScores';
import { ReactComponent as RewardsIcon } from '../assets/reward-personalities.svg';
import Button from '../components/Button';
import PageContentFlex from '../components/PageContentFlex';
import PageTitle from '../components/PageTitle';
import ROUTES from '../components/Router/RouteConfig';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import { useClimatePersonality } from '../hooks/useClimatePersonality';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';

const SubmitSetTwo: React.FC<{}> = () => {
  const history = useHistory();
  const quizResponses = useResponsesData();
  const { setSessionId, zipCode, quizSessionId } = useSession();
  const { setPersonalValuesError } = useClimatePersonality();

  const handleSubmit = async () => {
    // Submit my scores
    if (quizSessionId) {
      const SetOne = quizResponses.SetOne;
      const SetTwo = quizResponses.SetTwo;
      const response = await submitScores(
        { SetOne, SetTwo, zipCode },
        quizSessionId
      );
      // Set the Session id
      if (response && response.sessionId && setSessionId) {
        const sessionId = response.sessionId;
        setSessionId(sessionId);
      } else {
        setPersonalValuesError();
        // throw new Error('Failed to submit scores');
      }
      // Navigate to the climate personality page
      history.push(ROUTES.ROUTE_VALUES);
    }
  };

  return (
    <>
      <ScrollToTopOnMount />
      <Wrapper bgColor="#FF9439" fullHeight>
        <PageContentFlex>
          <PageTitle>Woohoo! Good Job!</PageTitle>

          <Box textAlign="center">
            <Typography variant="h6">
              With the questions you just answered I can predict your Climate
              Personality.
            </Typography>
          </Box>

          <Box>
            <RewardsIcon />
          </Box>

          <Box textAlign="center">
            <Typography variant="body1">
              This is a ranking of the top three personal values that you deploy
              when making decisions.
            </Typography>
          </Box>

          <Box>
            <Button
              id="submitButton"
              variant="contained"
              color="primary"
              fullWidth
              disableElevation
              onClick={handleSubmit}
              data-testid="finish-quiz-button"
            >
              Find out my Climate Personality
            </Button>
          </Box>
        </PageContentFlex>
      </Wrapper>
    </>
  );
};

export default SubmitSetTwo;
