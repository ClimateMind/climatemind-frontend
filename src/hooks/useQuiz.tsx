import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { pushQuestionToDataLayer } from '../analytics';
import { useResponses } from '../hooks/useResponses';
import { TAnswers, TQuestion } from '../types/types';
import { useQuestions } from './useQuestions';
import { useSession } from './useSession';

export const useQuiz = () => {
  type SetType = 'SET_ONE' | 'SET_TWO';
  const { push } = useHistory();
  const { sessionId } = useSession();

  const { questions, questionsLoading, questionsError, currentSet } =
    useQuestions();
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

  // Redirect the user to the submission page when the set is finished.
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
    // Saving answer to state
    if (currentSet === 1) {
      dispatch({
        type: 'ADD_SETONE',
        action: { questionId: questionId, answerId: parseInt(answerId) },
      });
    }
    if (currentSet === 2) {
      dispatch({
        type: 'ADD_SETTWO',
        action: { questionId: questionId, answerId: parseInt(answerId) },
      });
    }
    changeQuestionForward();
  };

  // Setting the questions on load;
  useEffect(() => {
    if (questions.SetOne && currentSet === 1) {
      const remainingQuestions: TQuestion[] = [...questions.SetOne];
      setRemainingQuestions(remainingQuestions);
    }
    if (questions.SetTwo && currentSet === 2) {
      const remainingQuestions: TQuestion[] = [...questions.SetTwo];
      setRemainingQuestions(remainingQuestions);
    }
  }, [questions, currentSet]);

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

  // Fire analytics event when a new question loads
  useEffect(() => {
    currentQuestion &&
      sessionId &&
      pushQuestionToDataLayer(currentQuestion.id, progress, sessionId);
  }, [currentQuestion, progress, sessionId]);

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
