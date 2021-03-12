import { useEffect, useState, useCallback } from 'react';
import { useQuestions } from './useQuestions';
import { TAnswers } from '../types/types';
import { useResponses } from '../hooks/useResponses';
import { TQuestion } from '../types/types';
import { pushQuestionToDataLayer } from '../analytics';
import { useHistory } from 'react-router-dom';
import  { Redirect } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { v4 as uuid } from 'uuid';
import { pushQuizStartToDataLayer } from '../analytics';

export const useQuiz = () => {
  type SetType = 'SET_ONE' | 'SET_TWO';
  const { push } = useHistory();
  const { quizSessionId, setQuizSessionId } = useSession();

  const { questions, questionsLoading, questionsError, currentSet } = useQuestions();
  const [answers, setAnswers] = useState<TAnswers | null>(null);
  const { dispatch } = useResponses();

  // Quiz state
  const [remainingQuestions, setRemainingQuestions] = useState<
    TQuestion[] | []
  >([]);
  const [questionsAnswered, setQuestionsAnswered] = useState<TQuestion[] | []>(
    []
  );
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion | null>(
    null
  );
  const [progress, setProgress] = useState(0); // Number of Questions Answered
  
  // const [currentSet, setCurrentSet] = useState<SetType>('SET_ONE'); // Number of Questions Answered

  const [test, setTest] = useState(0);

  //Actions

  if (progress === 10 && currentSet === 1) {
    push('submit');
  }
  if (progress === 10 && currentSet === 2) {
    push('submit-set-two');
  }

  const changeQuestionForward = useCallback(() => {
    // The questionnaire always presents the user with the last question on the remainingQuestions array. When the question is answered it is popped from the array and then pushed on to the questionsAnswered array. This is to allow us to go back in future.
    const oldCurrentQuestion = remainingQuestions?.pop();
    const updatedQuestionsAnswered = [...questionsAnswered];
    if (oldCurrentQuestion) {
      updatedQuestionsAnswered.push(oldCurrentQuestion);
      setQuestionsAnswered(updatedQuestionsAnswered);
      setRemainingQuestions(remainingQuestions);
    }
    // Set a new currentQuestion to the last question in the list
    setCurrentQuestion(remainingQuestions[remainingQuestions.length]);
    setProgress(progress + 1);
  }, [setRemainingQuestions, remainingQuestions, questionsAnswered, progress]);

  const changeQuestionBackward = useCallback(() => {
    if (questionsAnswered.length < 1) {
      return;
    }
    const updatedAnswered = [...questionsAnswered];
    const updatedToAnswer = [...remainingQuestions];
    const curr = updatedAnswered.pop();
    if (curr) {
      updatedToAnswer?.push(curr);
      setRemainingQuestions(updatedToAnswer);
      setQuestionsAnswered(updatedAnswered);
    }
    // Set a new currentQuestion to the last question in the list...
    setCurrentQuestion(remainingQuestions[remainingQuestions.length]);
    setProgress(progress - 1);
  }, [setRemainingQuestions, remainingQuestions, questionsAnswered, progress]);

  // Handle answering of a question
  const setAnswer = (questionId: number, answerId: string) => {
    console.log('about to save answer and the set is: ', currentSet)
    // Saving answer to state
    if(currentSet === 1){
      dispatch({
        type: 'ADD_SETONE',
        action: { questionId: questionId, answerId: parseInt(answerId) },
      });
    }
    if(currentSet === 2){
      dispatch({
        type: 'ADD_SETTWO',
        action: { questionId: questionId, answerId: parseInt(answerId) },
      });
    }
    changeQuestionForward();
  };

  // Set the quizSessionId if there isn't one
  useEffect(() => {
    if (!quizSessionId) {
      const newQuizSessionId = uuid();
      setQuizSessionId(newQuizSessionId);
      pushQuizStartToDataLayer(newQuizSessionId);
    }
  }, [quizSessionId, setQuizSessionId]);

  // Setting the questions on load;
  useEffect(() => {
    console.log('current set is :', currentSet);
    // TODO - For just now we are only using SetOne
    if (questions.SetOne && currentSet === 1) {
      const remainingQuestions: TQuestion[] = [...questions.SetOne];
      setRemainingQuestions(remainingQuestions);
      console.log('use questions from 1:', remainingQuestions);
    }
    if(questions.SetTwo && currentSet === 2){
      const remainingQuestions: TQuestion[] = [...questions.SetTwo];
      setRemainingQuestions(remainingQuestions);
      console.log('use questions from 2:', remainingQuestions);
    }
    // if(currentSet === 'SET_TWO'){
    //   console.log('set two..');
    // }
  }, [questions]);

  // Setting the answers on load
  useEffect(() => {
    if (questions.Answers && !answers) {
      setAnswers(questions.Answers);
    }
  }, [questions, answers, remainingQuestions, setRemainingQuestions]);

  // Set the first question to answer
  useEffect(() => {
    if (!currentQuestion && remainingQuestions.length) {
      // Set to the last question of the array

      const currentQuestion = remainingQuestions[remainingQuestions.length - 1];
      setCurrentQuestion(currentQuestion);
    }
  }, [
    remainingQuestions,
    currentQuestion,
    changeQuestionForward,
    setCurrentQuestion,
  ]);

  // add question id to url (for tracking)
  useEffect(() => {
    if (currentQuestion && quizSessionId) {
      pushQuestionToDataLayer(currentQuestion.id, quizSessionId);
    }
  }, [currentQuestion, quizSessionId]);

  return {
    currentQuestion,
    answers,
    progress,
    questionsError,
    questionsLoading,
    // setCurrentSet,
    // currentSet,
    setTest,
    setAnswer,
    changeQuestionBackward,
  };
};
