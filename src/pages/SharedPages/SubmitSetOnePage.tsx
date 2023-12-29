import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { Button } from '../../components/Button';
import PageContentFlex from '../../components/PageContentFlex';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import { usePostScores } from '../../hooks/usePostScores';
import { useQuestions } from '../../hooks/useQuestions';
import { useSession } from '../../hooks/useSession';
import { QuestionnaireFinishedEvent, analyticsService } from 'services';
import CmTypography from 'shared/components/CmTypography';

function SubmitSetOnePage() {
  const navigate = useNavigate();
  const { currentSet, setCurrentSet } = useQuestions();
  const { postScores, isLoading } = usePostScores();
  const { sessionId } = useSession();

  // Fire Analytics event when there are no more questions to be answered
  useEffect(() => {
    sessionId && analyticsService.postEvent(QuestionnaireFinishedEvent, '1');
  }, [sessionId]);

  useEffect(() => {
    if (currentSet === 2) {
      navigate('/questionnaire');
    }
  }, [currentSet]);

  const handleFinishSetTwo = () => {
    // switch to set 2 of questions
    if (setCurrentSet) {
      setCurrentSet(2);
    }
  };
  return (
    <Wrapper bgColor={'rgba(138, 213, 204, 0.6)'} fullHeight>
      <PageContentFlex>
        <Box textAlign="center">
          <PageTitle variant="h1">Woah! You are doing great!</PageTitle>
        </Box>

        <Box textAlign="center">
          <CmTypography variant="body">
            Do you want to carry on with another 10 questions or get your
            results now?
          </CmTypography>
        </Box>

        <Box mt={1}>
            <Button
              disabled={isLoading}
              onClick={postScores}
              id="submitButton"
              data-testid="continue-quiz-button"
            >
              Find out my Climate Personality
            </Button>
        </Box>

        <Box component="div">
          <CmTypography variant="body">
            You will get better personalised results if you complete all 20
            questions.
          </CmTypography>
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
            Continue
          </Button>
        </Box>
      </PageContentFlex>
    </Wrapper>
  );
}

export default SubmitSetOnePage;
