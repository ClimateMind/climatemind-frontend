import React, { createContext, useState, useEffect } from 'react';
import getQuestions from '../api/getQuestions';
import { TQuestions } from '../types/types';

type TQuestionContext = {
  questions: TQuestions;
  isLoading: boolean;
  isError: boolean;
};

const initialState = {
  questions: {} as TQuestions,
  isLoading: false,
  isError: false,
};

export const QuestionsContext = createContext<TQuestionContext>(initialState);

export const QuestionsProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [questions, setQuestions] = useState({} as TQuestions);
  const [isLoading, setIsLoading] = useState(state.isLoading);
  const [isError, setIsError] = useState(state.isError);

  // Fetch the Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getQuestions();
        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (!questions.SetOne && !isLoading && !isError) {
      fetchData();
    }
  }, [questions, isError, isLoading]);

  // Update the state
  useEffect(() => {
    const newState = {
      questions,
      isLoading,
      isError,
    };
    setState(newState);
  }, [setState, questions, isLoading, isError]);

  return (
    <QuestionsContext.Provider value={state}>
      {children}
    </QuestionsContext.Provider>
  );
};
