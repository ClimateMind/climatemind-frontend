import { createContext, useState, useEffect } from 'react';
import { TQuestions } from '../types/types';
import { useApiClient } from 'shared/hooks';

type TQuestionContext = {
  data: TQuestions;
  isLoading: boolean;
  isError: boolean;
  currentSet: number;
  setCurrentSet?: (currentSet: number) => any;
};

const initialState = {
  data: {} as TQuestions,
  isLoading: false,
  isError: false,
  currentSet: 1,
};

export const QuestionsContext = createContext<TQuestionContext>(initialState);

interface Props {
  children: React.ReactNode;
}

export function QuestionsProvider({ children }: Props) {
  const apiClient = useApiClient();

  const [state, setState] = useState(initialState);
  const [data, setData] = useState({} as TQuestions);
  const [isLoading, setIsLoading] = useState(state.isLoading);
  const [isError, setIsError] = useState(state.isError);
  const [currentSet, setCurrentSet] = useState(1);

  // Fetch the Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data: any = await apiClient.getQuestions();
        setData(data);
        setIsLoading(false);

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
      currentSet,
    };
    setState(newState);
  }, [setState, data, isLoading, isError, currentSet]);

  return (
    <QuestionsContext.Provider value={{ ...state, setCurrentSet }}>
      {children}
    </QuestionsContext.Provider>
  );
};
