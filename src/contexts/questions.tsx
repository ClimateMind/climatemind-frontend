import { createContext, useState, useEffect } from 'react';
import { ClimateApi } from '../api/ClimateApi';
// import { useAuth } from '../hooks/auth/useAuth';
import { useSession } from '../hooks/useSession';
import { TQuestions } from '../types/types';

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
  const { sessionId } = useSession();
  // const { accessToken } = useAuth();

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
        const data: any = await new ClimateApi(sessionId, '').getQuestions();
        setData(data);
        setIsLoading(false);
        //Set Error State if data not returned
        if (data.error) {
          throw new Error('Questions failed to load');
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
