import React, { useState } from 'react';
import { Box, FormLabel, Grid, makeStyles, useMediaQuery } from '@material-ui/core';

import Loader from '../../components/Loader';
import PrevButton from '../../components/PrevButton';
import Question from '../../components/Question';
import { useQuestions } from '../../hooks/useQuestions';
import { useQuiz } from '../../hooks/useQuiz';
import Error500 from './Error500Page';
import theme from '../../common/styles/CMTheme';
import { AppBarMini } from '../../components/AppBar/AppBarMini';
import Paragraphs from '../../components/Paragraphs';
import TextInput from '../../components/TextInput';
import { usePostFeedback } from '../../hooks/usePostFeedback';
import { CmButton, CmTypography } from 'shared/components';
import { ProgressBar } from 'features/quiz/components';

const styles = makeStyles((theme) => ({
  prevButtonContainer: {
    height: '24px',
  },
  questionNumber: {
    color: '#77AAAF',
    textAlign: 'right',
  },
  pageWrapper: {
    padding: `75px ${theme.spacing(2)}px`,
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
}));

function QuizPage() {
  const classes = styles();
  const {
    currentQuestion,
    answers,
    progress,
    setProgress,
    questionsError,
    questionsLoading,
    setAnswer,
    changeQuestionBackward,
  } = useQuiz();

  const [textInputValue, setTextInputValue] = useState('');

  const { currentSet } = useQuestions();

  const { submitFeedback } = usePostFeedback();

  const isXS = useMediaQuery(theme.breakpoints.down('xs'));

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
      <AppBarMini />
      <Grid
        id="pageWrapper"
        container
        className={classes.pageWrapper}
        justifyContent="center"
      >
        <Grid
          id="questionContainer"
          item
          xs={12}
          className={classes.pageContainer}
        >
          <Grid id="questionHeader" item container>
            <Grid item xs={3} className={classes.prevButtonContainer}>
              {progress > 0 && isXS && (
                <PrevButton
                  text="Previous"
                  clickPrevHandler={changeQuestionBackward}
                />
              )}
            </Grid>
            <Grid item xs={9}>
              <CmTypography
                variant="h3"
                className={classes.questionNumber}
                style={{ color: '#77AAAF', textAlign: 'right', margin: 0 }}
              >
                {currentSet === 2
                  ? `Q${progress + 11}`
                  : progress === 10
                  ? ''
                  : `Q${progress + 1}`}
                <span
                  data-testid="totalQuestions"
                  className={classes.totalQuestions}
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
                  className={
                    isXS
                      ? classes.questionHeader
                      : classes.questionHeaderLargeScreen
                  }
                  id="questionText"
                >
                  <Paragraphs
                    text="What's stopping you from having climate conversations?"
                    fontSize="18px"
                    bold
                  />
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
            <Box className={classes.prevButtonLagreScreen}>
              <PrevButton
                text="Previous"
                clickPrevHandler={changeQuestionBackward}
              />
            </Box>
          )}
          {progress >= 10 && !isXS && (
            <Box className={classes.prevButtonLagreScreen}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PrevButton
                  text="Previous"
                  clickPrevHandler={changeQuestionBackward}
                />
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

export default QuizPage;
