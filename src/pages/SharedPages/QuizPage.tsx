import { useState } from 'react';
import { Box, FormLabel, Grid } from '@mui/material';

import Loader from '../../components/Loader';
import Question from '../../features/quiz/components/Question';
import { useQuestions } from '../../hooks/useQuestions';
import { useQuiz } from '../../hooks/useQuiz';
import Error500 from './Error500Page';
import TextInput from '../../components/TextInput';
import { usePostFeedback } from '../../hooks/usePostFeedback';
import { CmBackButton, CmButton, CmTypography } from 'shared/components';
import { ProgressBar } from 'features/quiz/components';

function QuizPage() {
  const { currentQuestion, answers, progress, setProgress, questionsError, questionsLoading, setAnswer, changeQuestionBackward } = useQuiz();
  const { currentSet } = useQuestions();
  const { submitFeedback } = usePostFeedback();

  const [textInputValue, setTextInputValue] = useState('');
  const isXS = false;

  const finishQuizHandler = () => {
    // Only save the feedback if it's not empty
    if (textInputValue.trim()) {
      submitFeedback(textInputValue.trim());
    }

    setProgress(11);
  };

  if (questionsError) {
    return <Error500 />;
  }

  if (questionsLoading || !answers) {
    return <Loader />;
  }

  const totalQuestions = currentSet === 1 ? 10 : 20;

  return (
    <div>
      <Grid
        id="pageWrapper"
        container
        style={styles.pageWrapper}
        justifyContent="center"
      >
        <Grid
          id="questionContainer"
          item
          xs={12}
          style={styles.pageContainer}
        >
          <Grid id="questionHeader" item container>
            <Grid item xs={3} style={styles.prevButtonContainer}>
              {progress > 0 && isXS && (
                <CmBackButton text='Previous' onClick={changeQuestionBackward} />
              )}
            </Grid>
            <Grid item xs={9}>
              <CmTypography
                variant="h3"
                style={{ ...styles.questionNumber, color: '#77AAAF', textAlign: 'right', margin: 0 }}
              >
                {currentSet === 2
                  ? `Q${progress + 11}`
                  : progress === 10
                  ? ''
                  : `Q${progress + 1}`}
                <span
                  data-testid="totalQuestions"
                  style={styles.totalQuestions}
                >
                  {progress === 10 ? 'BONUS' : `/${totalQuestions}`}
                </span>
              </CmTypography>
            </Grid>

            <ProgressBar progress={progress} />
          </Grid>
          <Grid item container>
            {progress < 10 && currentQuestion ? (
              <Question
                key={currentQuestion.id}
                questionNumber={progress + 1}
                questionId={currentQuestion.id}
                question={currentQuestion.question}
                answers={answers}
                setAnswer={setAnswer}
                isSmall={isXS}
              />
            ) : (
              <Grid item xs={12}>
                <FormLabel
                  component="legend"
                  style={
                    isXS
                      ? styles.questionHeader
                      : styles.questionHeaderLargeScreen
                  }
                  id="questionText"
                >
                  <CmTypography variant='body' style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    What's stopping you from having climate conversations?
                  </CmTypography>
                </FormLabel>
                <TextInput
                  margin="none"
                  fullWidth={true}
                  variant="filled"
                  color="secondary"
                  onChange={(e) => setTextInputValue(e.target.value)}
                ></TextInput>
              </Grid>
            )}
          </Grid>
          {progress < 10 && !isXS && (
            <Box style={styles.prevButtonLagreScreen}>
              <CmBackButton text='Previous' onClick={changeQuestionBackward} />
            </Box>
          )}
          {progress >= 10 && !isXS && (
            <Box style={styles.prevButtonLagreScreen}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CmBackButton text='Previous' onClick={changeQuestionBackward} />
                <CmButton
                  text='Finish Quiz'
                  onClick={finishQuizHandler}
                />
              </div>
            </Box>
          )}
          {progress >= 10 && isXS && (
            <Box py={3} textAlign="center">
              <CmButton
                text='Finish Quiz'
                onClick={finishQuizHandler}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  prevButtonContainer: {
    height: '24px',
  },
  questionNumber: {
    color: '#77AAAF',
    textAlign: 'right',
  },
  pageContainer: {
    maxWidth: '640px',
  },
  prevButtonLagreScreen: {
    marginTop: '75px',
  },
  totalQuestions: {
    fontSize: '16px',
  },
  questionHeader: {
    margin: '1em 0',
    width: '100%',
    display: 'block',
  },
  questionHeaderLargeScreen: {
    marginTop: '64px',
    marginBottom: '1em',
    width: '100%',
    display: 'block',
  },
};

export default QuizPage;
