import {
  Box,
  FormLabel,
  Grid,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import PrevButton from '../components/PrevButton';
import CMProgress from '../components/ProgressBar';
import Question from '../components/Question';
import { useQuestions } from '../hooks/useQuestions';
import { useQuiz } from '../hooks/useQuiz';
import Error500 from '../pages/Error500';
import theme from '../common/styles/CMTheme';
import { AppBarMini } from '../components/AppBar/AppBarMini';
import Paragraphs from '../components/Paragraphs';
import TextInput from '../components/TextInput';
import { Button } from '../components/Button';
import { usePostFeedback } from '../hooks/usePostFeedback';

const styles = makeStyles((theme) => ({
  progressContainer: {
    minHeight: '45px',
    width: '100%',
  },
  progressBarContainer: {
    height: '12px',
    width: '100%',
    margin: 0,
    padding: '0.4em 0',
    '& > *': {
      display: 'block',
    },
  },
  prevButtonContainer: {
    height: '24px',
  },
  progressBar: {
    flexGrow: 1,
    height: '4px',
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

const Questionaire: React.FC<{}> = () => {
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
      submitFeedback({ text: textInputValue.trim() });
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
    <>
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
              <Typography
                variant="h4"
                className={classes.questionNumber}
                data-testid="questionNumber"
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
              </Typography>
            </Grid>

            <Grid item className={classes.progressBarContainer}>
              {/* Progress Bar */}
              <CMProgress
                aria-label="Questionnaire Progress"
                className={classes.progressBar}
                variant="determinate"
                value={progress * 10}
              />
            </Grid>
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
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={finishQuizHandler}
                >
                  Finish Quiz
                </Button>
              </div>
            </Box>
          )}
          {progress >= 10 && isXS && (
            <Box py={3} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={finishQuizHandler}
              >
                Finish Quiz
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Questionaire;
