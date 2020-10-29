import React, { useState, useEffect, useCallback } from 'react';
import Question from '../components/Question';
import { useQuestions } from '../hooks/useQuestions';
import { TQuestion } from '../types/types';
import Loader from '../components/Loader';
import { makeStyles, Grid, LinearProgress, Box } from '@material-ui/core';
import SubmitQuestionnaire from './SubmitQuestionnaire';
import { TAnswers } from '../types/types';
import { useResponses } from '../hooks/useResponses';
import PrevButton from '../components/PrevButton';
import EmptyState from '../components/EmptyState';

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
  const { questions, questionsLoading, questionsError } = useQuestions();
  // List of answers

  const [answers, setAnswers] = useState<TAnswers | null>(null);
  // Questions still to be answered

  const [questionsToAnswer, setQuestionsToAnswer] = useState<TQuestion[] | []>(
    []
  );
  // Questions which the user has already answered (allowing us to do back)
  const [questionsAnswered, setQuestionsAnswered] = useState<TQuestion[] | []>(
    []
  );
  // Current Question being answered
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion | null>(
    null
  );
  // Question number user is on
  const [progress, setProgress] = useState(0);

  // Update the state of responses
  const { dispatch } = useResponses();

  // Move forward a question
  const changeQuestionForward = useCallback(() => {
    // The questionnaire always presents the user with the last question on the questionsToAnswer array. When the question is answered it is popped from the array and then pushed on to the questionsAnswered array. This is to allow us to go back in future.
    const oldCurrentQuestion = questionsToAnswer?.pop();
    const updatedQuestionsAnswered = [...questionsAnswered];
    if (oldCurrentQuestion) {
      updatedQuestionsAnswered.push(oldCurrentQuestion);
      setQuestionsAnswered(updatedQuestionsAnswered);
      setQuestionsToAnswer(questionsToAnswer);
    }
    // Set a new currentQuestion to the last question in the list
    setCurrentQuestion(questionsToAnswer[questionsToAnswer.length]);
    setProgress(progress + 1);
  }, [setQuestionsToAnswer, questionsToAnswer, questionsAnswered, progress]);

  const changeQuestionBackward = useCallback(() => {
    if (questionsAnswered.length < 1) {
      return;
    }
    const updatedAnswered = [...questionsAnswered];
    const updatedToAnswer = [...questionsToAnswer];
    const curr = updatedAnswered.pop();
    if (curr) {
      updatedToAnswer?.push(curr);
      setQuestionsToAnswer(updatedToAnswer);
      setQuestionsAnswered(updatedAnswered);
    }
    // Set a new currentQuestion to the last question in the list...
    setCurrentQuestion(questionsToAnswer[questionsToAnswer.length]);
    setProgress(progress - 1);
  }, [setQuestionsToAnswer, questionsToAnswer, questionsAnswered, progress]);

  // Handle answering of a question
  const setAnswer = (questionId: number, answerId: string) => {
    // Saving answer to state
    dispatch({
      type: 'ADD_SETONE',
      action: { questionId: questionId, answerId: parseInt(answerId) },
    });
    changeQuestionForward();
  };

  // Setting the questions on load;
  useEffect(() => {
    // TODO - For just now we are only using SetOne
    if (questions.SetOne) {
      const questionsToAnswer: TQuestion[] = [...questions.SetOne];
      setQuestionsToAnswer(questionsToAnswer);
    }
  }, [questions]);

  // Setting the answers on load
  useEffect(() => {
    if (questions.Answers && !answers) {
      setAnswers(questions.Answers);
    }
  }, [questions, answers, questionsToAnswer, setQuestionsToAnswer]);

  // Set the first question to answer
  useEffect(() => {
    if (!currentQuestion && questionsToAnswer.length) {
      // Set to the last question of the array

      const currentQuestion = questionsToAnswer[questionsToAnswer.length - 1];
      setCurrentQuestion(currentQuestion);
    }
  }, [
    questionsToAnswer,
    currentQuestion,
    changeQuestionForward,
    setCurrentQuestion,
  ]);

  //Show submit page when quiz is complete - This just a hack just now to show the quiz is completed, we need a better machanism in future.
  if (progress === 10) {
    return <SubmitQuestionnaire />;
  }

  if (questionsLoading || !currentQuestion || !answers) {
    return <Loader />;
  }

  if (questionsError) {
    return <EmptyState message="Error: Questions failed to load ☹️" />;
  }

  return (
    <Grid container className={classes.root}>
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
    </Grid>
  );
};

export default Questionaire;
