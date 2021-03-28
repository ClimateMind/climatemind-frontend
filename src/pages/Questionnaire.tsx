import { Box, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import PrevButton from '../components/PrevButton';
import CMProgress from '../components/ProgressBar';
import Question from '../components/Question';
import { useQuestions } from '../hooks/useQuestions';
import { useQuiz } from '../hooks/useQuiz';
import Error500 from '../pages/Error500';
import theme from '../common/styles/CMTheme';


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
    maxWidth: '640px',
  },
  prevButtonLagreScreen: {
    marginTop: '75px',
  }
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

  const {currentSet} = useQuestions();
  
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
    
  useEffect(()=>{
      console.log({isXS})
  },[isXS]);

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
            {progress > 0 && isXS && (
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
              Q{currentSet === 2 ? progress + 11 : progress + 1}
              {/* Q{progress + 1}  */}
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
            isSmall={isXS}
          />
        </Grid>
        {progress > 0 && !isXS && (
              <Box className={classes.prevButtonLagreScreen} >
                <PrevButton
                  text="Previous"
                  clickPrevHandler={changeQuestionBackward}
                />
              </Box>
            )}
      </Grid>
    </Grid>
  );
};

export default Questionaire;
