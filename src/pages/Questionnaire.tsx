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
    minHeight: '100vh',
    overflow: 'hidden',
    padding: '1em 2em',
  },
  progressContainer: {
    minHeight: '45px',
  },
  progressBarContainer: {
    height: '12px',

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
    <>
      <PageWrapper>
        <Grid container>
          <Grid item xs={false} lg={3}>
            {/* Row 1 - Left Gutter */}
          </Grid>
          <Grid item sm={12} lg={6} container justify="center">
            <Box my={2}>
              <Question
                key={currentQuestion.id}
                questionNumber={progress + 1}
                questionId={currentQuestion.id}
                question={currentQuestion.question}
                answers={answers}
                setAnswer={setAnswer}
              />
            </Box>
          </Grid>
          <Grid item xs={false} lg={3}>
            {/* Right Gutter */}
          </Grid>
        </Grid>
        <Grid item container className={classes.progressContainer}>
          <Grid item xs={false} lg={3}>
            {/* Row 2 -Left Gutter */}
          </Grid>
          <Grid item xs={12} lg={6} className={classes.progressBarContainer}>
            <LinearProgress
              aria-label="Questionnaire Progress"
              className={classes.progressBar}
              variant="determinate"
              color="secondary"
              value={progress * 10}
            />
          </Grid>
          <Grid item xs={false} lg={3}>
            {/* Right Gutter */}
          </Grid>

          <Grid item xs={false} lg={3}>
            {/* Row 3 -Left Gutter */}
          </Grid>
          {progress > 0 && (
            <PrevButton text="Back" clickPrevHandler={changeQuestionBackward} />
          )}
          <Grid item xs={false} lg={3}>
            {/* Right Gutter */}
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  );
};

export default Questionaire;
