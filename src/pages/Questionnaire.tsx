import React from 'react';
import Question from '../components/Question';
import Error500 from '../pages/Error500';
import Loader from '../components/Loader';
import PageWrapper from '../components/PageWrapper';
import { makeStyles, Grid, LinearProgress, Box } from '@material-ui/core';
import PrevButton from '../components/PrevButton';
import { useQuiz } from '../hooks/useQuiz';

const styles = makeStyles({
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
    padding: 0,
    '& > *': {
      display: 'block',
    },
  },
  progressBar: {
    flexGrow: 1,
    height: '6px',
  },
  quizBox: {
    display: 'flex',
    margin: '0 auto',
  },
});

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
      <PageWrapper>
        <Grid item className={classes.progressBarContainer}>
          {progress > 0 && (
            <PrevButton text="Back" clickPrevHandler={changeQuestionBackward} />
          )}
          {/*no progress = #39F5AD */}
          {/* progress = #07373B */}
          {/* not sure where to get the colors */}
          <LinearProgress
            aria-label="Questionnaire Progress"
            className={classes.progressBar}
            variant="determinate"
            color="secondary"
            value={progress * 10}
          />

          <Grid item className={classes.quizBox}>
            <Box my={2} className={classes.quizBox}>
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
      </PageWrapper>
    </div>
  );
};

export default Questionaire;
