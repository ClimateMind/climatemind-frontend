import React, { createContext, useReducer } from 'react';
import Reducer from '../reducers/responsesReducer';
import { TResponses } from '../types/types';

const testQuestionResponses: TResponses = {
  SetOne: [],
};

export const ResponsesContext = createContext<TResponses>({} as TResponses);
export const ResponsesReducerContext = createContext<React.Dispatch<any>>(
  () => null
);

export const ResponsesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, testQuestionResponses);

  return (
    <ResponsesContext.Provider value={state}>
      <ResponsesReducerContext.Provider value={dispatch}>
        {children}
      </ResponsesReducerContext.Provider>
    </ResponsesContext.Provider>
  );
};
