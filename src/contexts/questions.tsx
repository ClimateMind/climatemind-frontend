import React, { createContext, useState, useEffect } from 'react';
import getQuestions from '../api/getQuestions';
import { TQuestions } from '../types/types';

type TQuestionContext = {
  data: TQuestions;
  isLoading: boolean;
  isError: boolean;
};

const initialState = {
  data: {} as TQuestions,
  isLoading: false,
  isError: false,
};

export const QuestionsContext = createContext<TQuestionContext>(initialState);

export const QuestionsProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({} as TQuestions);
  const [isLoading, setIsLoading] = useState(state.isLoading);
  const [isError, setIsError] = useState(state.isError);

  // Fetch the Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getQuestions();
        setData(data);
        setIsLoading(false);
        //Set Error State if data not returned
        if (!data.SetOne) {
          setIsError(true);
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (!data.SetOne && !isLoading && !isError) {
      fetchData();
    }
  }, [data, isError, isLoading]);

  // Update the state
  useEffect(() => {
    const newState = {
      data,
      isLoading,
      isError,
    };
    setState(newState);
  }, [setState, data, isLoading, isError]);

  return (
    <QuestionsContext.Provider value={state}>
      {children}
    </QuestionsContext.Provider>
  );
};
