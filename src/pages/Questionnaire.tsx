import React from 'react';
import Question from '../components/Question';
import Error500 from '../pages/Error500';
import Loader from '../components/Loader';
import { makeStyles, Grid } from '@material-ui/core';
import PrevButton from '../components/PrevButton';
import { useQuiz } from '../hooks/useQuiz';
import Typography from '@material-ui/core/Typography';
import CMProgress from '../components/ProgressBar';

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
  progressBar: {
    flexGrow: 1,
    height: '4px',
  },
  questionNumber: {
    color: '#77AAAF',
    textAlign: 'right',
  },
  pageWrapper: {
    padding: `50px ${theme.spacing(2)}px`,
  },
  pageContainer: {
    maxWidth: '600px',
  },
}));

const Questionaire: React.FC<{}> = () => {
  const classes = styles();
  const {
    currentQuestion,
    answers,
    progress,
    questionsError,
    questionsLoading,
    setAnswer,
    changeQuestionBackward,
  } = useQuiz();

  if (questionsError) {
    return <Error500 />;
  }

  if (questionsLoading || !currentQuestion || !answers) {
    return <Loader />;
  }

  return (
    <Grid
      id="pageWrapper"
      container
      className={classes.pageWrapper}
      justify="center"
    >
      <Grid
        id="questionContainer"
        item
        xs={12}
        className={classes.pageContainer}
      >
        <Grid id="questionHeader" item container>
          <Grid item xs={10}>
            {progress > 0 && (
              <PrevButton
                text="Previous"
                clickPrevHandler={changeQuestionBackward}
              />
            )}
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h4"
              className={classes.questionNumber}
              data-testid="questionNumber"
            >
              Q{progress + 1}
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
          <Question
            key={currentQuestion.id}
            questionNumber={progress + 1}
            questionId={currentQuestion.id}
            question={currentQuestion.question}
            answers={answers}
            setAnswer={setAnswer}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Questionaire;
