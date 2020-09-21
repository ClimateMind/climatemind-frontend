import React, { createContext, useReducer } from 'react';
import { TResponses } from '../types/types';

// -- Reducer ---//
type Action = {
  type: 'ADD_SETONE';
  action: {
    questionId: number;
    answerId: number;
  };
};

// TO DO - The Assumption at present is that each time we are supplied a question, in it will have not yet been answered. Need to add the functionality to check if the question has already been answered and update if if has.

export function responsesReducer(state: TResponses, action: Action) {
  switch (action.type) {
    case 'ADD_SETONE':
      const newState = {
        ...state,
      };
      newState.SetOne.push({
        questionId: action.action.questionId,
        answerId: action.action.answerId,
      });
      return newState;
    default:
      return state;
  }
}

// --- use Responses Hook ---//

const intialResponses: TResponses = {
  SetOne: [],
};

const useResponses = () => {
  const [state, dispatch] = useReducer(responsesReducer, intialResponses);

  return { state, dispatch };
};

// -- Context Provider ---//

export const ResponsesContext = createContext<TResponses>({} as TResponses);
export const ResponsesReducerContext = createContext<React.Dispatch<any>>(
  () => null
);

export const ResponsesProvider: React.FC = ({ children }) => {
  const { state, dispatch } = useResponses();

  return (
    <ResponsesContext.Provider value={state}>
      <ResponsesReducerContext.Provider value={dispatch}>
        {children}
      </ResponsesReducerContext.Provider>
    </ResponsesContext.Provider>
  );
};
