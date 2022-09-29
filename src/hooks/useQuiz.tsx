import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { pushQuestionToDataLayer } from '../analytics';
import { useResponses } from '../hooks/useResponses';
import { TAnswers, TQuestion } from '../types/types';
import { useQuestions } from './useQuestions';
import { useSession } from './useSession';
import { useAlignment } from './useAlignment';
import ROUTES from '../components/Router/RouteConfig';
import { usePostScores } from './usePostScores';
import { useUserB } from './useUserB';

export const useQuiz = () => {
  const { push } = useHistory();
  const location = useLocation();
  const { sessionId } = useSession();
  const { questions, questionsLoading, questionsError, currentSet } =
    useQuestions();
  const [answers, setAnswers] = useState<TAnswers | null>(null);
  const { dispatch } = useResponses();
  const { isUserB, setIsUserB } = useAlignment();
  const { postScores } = usePostScores();
  const { conversationId } = useUserB();

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
  // User A
  useEffect(() => {
    // User B
    if (progress === 10 && conversationId) {
      setIsUserB(true, conversationId);
      postScores();
      push({
        pathname: `${ROUTES.USERB_CORE_VALUES}/${conversationId}`,
        state: { from: location.pathname, id: conversationId },
      });
    } else if (progress === 10 && currentSet === 1 && !isUserB) {
      push(ROUTES.ROUTE_SUBMIT);
    } else if (progress === 10 && currentSet === 2 && !isUserB) {
      push(ROUTES.ROUTE_SUBMIT_SET_TWO);
    }
  }, [
    progress,
    currentSet,
    isUserB,
    postScores,
    push,
    conversationId,
    location.pathname,
    setIsUserB,
  ]);

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

  // Handle answering of a question and save the response to the response context
  function setAnswer(questionId: number, answerId: string) {
    // Set the correct dispatch type based on the question set the user is answering.
    const dispatchType = currentSet === 1 ? 'ADD_SETONE' : 'ADD_SETTWO';
    dispatch({
      type: dispatchType,
      action: { questionId: questionId, answerId: parseInt(answerId) },
    });
    changeQuestionForward();
  }

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
