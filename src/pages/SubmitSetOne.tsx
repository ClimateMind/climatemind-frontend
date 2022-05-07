import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import PageContentFlex from '../components/PageContentFlex';
import PageTitle from '../components/PageTitle';
import Wrapper from '../components/Wrapper';
import { usePostScores } from '../hooks/usePostScores';
import { useQuestions } from '../hooks/useQuestions';
import { useSession } from '../hooks/useSession';
import { pushSetFinishToDataLayer } from '../analytics';

const SubmitSetOne: React.FC<{}> = () => {
  const { push } = useHistory();
  const { currentSet, setCurrentSet } = useQuestions();
  const { postScores, isLoading } = usePostScores();
  const { sessionId } = useSession();

  // Fire Analytics event when there are no more questions to be answered
  useEffect(() => {
    sessionId && pushSetFinishToDataLayer(1, sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (currentSet === 2) {
      push('/questionnaire');
    }
  }, [currentSet, push]);

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
              disabled={isLoading}
              onClick={postScores}
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
            disabled={isLoading}
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
