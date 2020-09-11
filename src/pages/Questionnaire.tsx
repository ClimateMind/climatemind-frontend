import React, { useState, useEffect, useCallback } from 'react';
import Question from '../components/Question';
import { useQuestions } from '../hooks/useQuestions';
import { TQuestion } from '../types/types';
import Loader from './Loading';
import { makeStyles, Grid, LinearProgress, Box } from '@material-ui/core';
import SubmitQuestionnaire from './SubmitQuestionnaire';

const styles = makeStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    minHeight: '100vh',
    maxWidth: '90%',
    margin: '0 auto',
    overflow: 'hidden',
  },
  //
  progressStyles: {
    width: '90%',
    margin: '0 auto',
    height: 6,
    position: 'absolute',
    bottom: 60,
  },
});

const Questionaire: React.FC<{}> = () => {
  const classes = styles();
  const questions = useQuestions();
  // List of answers
  const [answers, setAnswers] = useState<string[] | null>(null);
  // Questions to be answered
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
  const [progress, setProgress] = useState(1);

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

  // Handle answering of a question
  const setAnswer = (questionId: number, value: string) => {
    // TO DO - Deal with setting the answers into state
    console.log(`Setting answser of Q${questionId} to ${value}`);
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
      const answers = Object.values(questions.Answers);
      setAnswers(answers);
    }
  }, [questions, answers, questionsToAnswer, setQuestionsToAnswer]);

  // Set the first question to answer
  useEffect(() => {
    if (!currentQuestion && questionsToAnswer.length) {
      // Set to the last question of the array

      const currentQuestion = questionsToAnswer[questionsToAnswer.length - 1];
      // TODO - Need to pop question off and add it to questions answered.
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

  if (!currentQuestion || !answers) {
    return <Loader />;
  }

  return (
    <Grid container className={classes.root}>
      <Grid item sm={false} lg={4}>
        {/* left gutter */}
      </Grid>

      <Grid item sm={12} lg={4}>
        <Box my={12}>
          <Question
            key={currentQuestion.id}
            questionNumber={progress}
            questionId={currentQuestion.id}
            question={currentQuestion.question}
            answers={answers}
            setAnswer={setAnswer}
          />
        </Box>
      </Grid>

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
      <LinearProgress
        className={classes.progressStyles}
        variant="determinate"
        color="secondary"
        value={progress * 10}
      />
    </Grid>
  );
};

export default Questionaire;
