import React from 'react';
import Question from '../components/Question';
import Error500 from '../pages/Error500';
import Loader from '../components/Loader';
import PageWrapper from '../components/PageWrapper';
import { makeStyles, Grid, LinearProgress, Box } from '@material-ui/core';
import PrevButton from '../components/PrevButton';
import { useQuiz } from '../hooks/useQuiz';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles((theme) => ({
  root: {
    margin: '-1em auto 3em',
  },
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
    height: '6px',
  },
  questionNumber: {
    // marginRight: '1em',
    color: '#77AAAF',
  },
  pageWrapper: {
    padding: `50px ${theme.spacing(2)}px`,
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
    <div className={classes.root}>
      {/*no progress = #39F5AD */}
      {/* progress = #07373B */}
      {/* not sure where to get the colors */}
      <Grid container className={classes.pageWrapper}>
        <Grid item container>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {/* Question No and back button */}
            <Grid item xs={10}>
              {progress > 0 && (
                <PrevButton
                  text="Back"
                  clickPrevHandler={changeQuestionBackward}
                />
              )}
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h4" className={classes.questionNumber}>
                Q{progress + 1}
              </Typography>
            </Grid>
          </Grid>

          <Grid item className={classes.progressBarContainer}>
            {/* Progress Bar */}
            <LinearProgress
              aria-label="Questionnaire Progress"
              className={classes.progressBar}
              variant="determinate"
              color="secondary"
              value={progress * 10}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Box my={2}>
            <Question
              key={currentQuestion.id} // need to separate the question number from questions and answers...
              questionNumber={progress + 1}
              questionId={currentQuestion.id}
              question={currentQuestion.question}
              answers={answers}
              setAnswer={setAnswer}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Questionaire;
