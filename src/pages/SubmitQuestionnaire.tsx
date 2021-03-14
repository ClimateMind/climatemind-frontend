import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Button from '../components/Button';
import ROUTES from '../components/Router/RouteConfig';
import { COLORS } from '../common/styles/CMTheme';
import { submitScores } from '../api/postScores';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import PageWrapper from '../components/PageWrapper';
import { useClimatePersonality } from '../hooks/useClimatePersonality';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { useQuestions } from '../hooks/useQuestions';
import { TResponse } from '../types/types';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      marginBottom: 0,
    },
    gridItem: {
      width: '100%',
    },
    form: {
      width: '100%',
    },
    formInput: {
      paddingRight: 8,
    },
    formButton: {
      fontSize: 40,
    },
    skipButton: {
      color: COLORS.DK_TEXT,
    },
    submit: {
      textAlign: 'center',
      marginTop: '80px',
    },
  })
);

const SubmitQuestionnaire: React.FC<{}> = () => {
  const { push } = useHistory();
  const classes = useStyles();
  const history = useHistory();
  const quizResponses = useResponsesData();
  const { setSessionId, zipCode, quizSessionId } = useSession();
  const { setPersonalValuesError } = useClimatePersonality();
  const {currentSet, setCurrentSet} = useQuestions();

  useEffect(()=>{
    if(currentSet === 2 ){  
      push('/questionnaire');
    }
  },[currentSet]);

  const handleSubmit = async () => {
    // Submit my scores
    if (quizSessionId) {
      const SetOne = quizResponses.SetOne;
      const SetTwo: TResponse[] = [];
      const response = await submitScores({ SetOne, SetTwo, zipCode }, quizSessionId);
      // Set the Session id
      if (response && response.sessionId && setSessionId) {
        const sessionId = response.sessionId;
        setSessionId(sessionId);
      } else {
        setPersonalValuesError();
        // throw new Error('Failed to submit scores');
      }
      // Navigate to the climate personality page
      history.push(ROUTES.ROUTE_VALUES);
    }
  };

  const handleFinishSetTwo = () => {
    // switch to set 2 of questions
    if(setCurrentSet){
      setCurrentSet(2);
    }
  }
  return (
    <PageWrapper bgColor={COLORS.ACCENT1}>
      {/* Page header */}

      <ScrollToTopOnMount />

      <Grid item spacing={5} container direction="row" alignItems="center">
        <Grid item xs={3}>
          <Logo width="76" data-testid="climate-mind-logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h4">Woah! You are doing great!</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Box textAlign="center">
          <Typography variant="h6">
          Do you want to carry on with another 10 questions or get your results now?
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box mt={1}>
          <Typography variant="body1" align="center">
            <Button onClick={handleSubmit} className={classes.skipButton} id="submitButton">
            Find out my Climate Personality
            </Button>
          </Typography>
        </Box>
      </Grid>

      <Grid item >
        <Typography variant="body1" align="center">
          You will get better personalised results if you complete all 20 questions.
        </Typography>
        <Box component="div" className={classes.submit}>
          <Button
            disabled={false}
            color="primary"
            onClick={handleFinishSetTwo}
            variant="contained"
            disableElevation
            data-testid="finish-quiz-button"
          >
            FINISH THE QUIZ
          </Button>
        </Box>
      </Grid>

      
    </PageWrapper> 
    
  );
};

export default SubmitQuestionnaire;
