import { useEffect, useState, useCallback } from 'react';
import { useQuestions } from './useQuestions';
import { TAnswers } from '../types/types';
import { useResponses } from '../hooks/useResponses';
import { TQuestion } from '../types/types';
import { pushQuestionToDataLayer } from '../analytics';
import { useHistory } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { v4 as uuid } from 'uuid';
import { pushQuizStartToDataLayer } from '../analytics';

export const useQuiz = () => {
  const { push } = useHistory();
  const { quizSessionId, setQuizSessionId } = useSession();

  const { questions, questionsLoading, questionsError } = useQuestions();
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

  //Actions

  if (progress === 10) {
    push('submit');
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
    // Saving answer to state
    dispatch({
      type: 'ADD_SETONE',
      action: { questionId: questionId, answerId: parseInt(answerId) },
    });
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
    // TODO - For just now we are only using SetOne
    if (questions.SetOne) {
      const remainingQuestions: TQuestion[] = [...questions.SetOne];
      setRemainingQuestions(remainingQuestions);
    }
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
    setAnswer,
    changeQuestionBackward,
  };
};
