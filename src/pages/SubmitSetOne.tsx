import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { submitScores } from '../api/postScores';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import PageContentFlex from '../components/PageContentFlex';
import PageTitle from '../components/PageTitle';

import ROUTES from '../components/Router/RouteConfig';
import Wrapper from '../components/Wrapper';
import { useClimatePersonality } from '../hooks/useClimatePersonality';
import { useQuestions } from '../hooks/useQuestions';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import { TResponse } from '../types/types';

const SubmitSetOne: React.FC<{}> = () => {
  const { push } = useHistory();
  const history = useHistory();
  const quizResponses = useResponsesData();
  const { setSessionId, zipCode, quizSessionId } = useSession();
  const { setPersonalValuesError } = useClimatePersonality();
  const { currentSet, setCurrentSet } = useQuestions();

  useEffect(() => {
    if (currentSet === 2) {
      push('/questionnaire');
    }
  }, [currentSet, push]);

  const handleSubmit = async () => {
    // Submit my scores
    if (quizSessionId) {
      const SetOne = quizResponses.SetOne;
      const SetTwo: TResponse[] = [];
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
    }
    history.push(ROUTES.ROUTE_VALUES);
  };

  const handleFinishSetTwo = () => {
    // switch to set 2 of questions
    if (setCurrentSet) {
      setCurrentSet(2);
    }
  };
  return (
    <Wrapper bgColor={COLORS.ACCENT1} fullHeight>
      <PageContentFlex>
        <Box textAlign="center">
          <PageTitle variant="h1">Woah! You are doing great!</PageTitle>
        </Box>

        <Box textAlign="center">
          <Typography variant="h6">
            Do you want to carry on with another 10 questions or get your
            results now?
          </Typography>
        </Box>

        <Box mt={1}>
          <Typography variant="body1" align="center">
            <Button
              onClick={handleSubmit}
              id="submitButton"
              data-testid="continue-quiz-button"
            >
              Find out my Climate Personality
            </Button>
          </Typography>
        </Box>

        <Box component="div">
          <Typography variant="body1" align="center">
            You will get better personalised results if you complete all 20
            questions.
          </Typography>
        </Box>

        <Box component="div">
          <Button
            disabled={false}
            color="primary"
            onClick={handleFinishSetTwo}
            variant="contained"
            disableElevation
            data-testid="finish-quiz-button"
          >
            FINISH THE QUIZ
          </Button>
        </Box>
      </PageContentFlex>
    </Wrapper>
  );
};

export default SubmitSetOne;
