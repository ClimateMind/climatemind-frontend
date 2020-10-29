import { useContext } from 'react';
import { QuestionsContext } from '../contexts/questions';

export const useQuestions = () => {
  const state = useContext(QuestionsContext);
  const questions = state.data;
  const questionsLoading = state.isLoading;
  const questionsError = state.isError;

  return { questions, questionsLoading, questionsError };
};
