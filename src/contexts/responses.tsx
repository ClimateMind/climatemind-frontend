import React, { createContext, useReducer } from 'react';
import { TResponses, TResponse } from '../types/types';

// -- Context Provider ---//
export const ResponsesContext = createContext<TResponses>({} as TResponses);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResponsesDispatchContext = createContext<React.Dispatch<any>>(
  () => null
);

const intialResponses: TResponses = {
  SetOne: [],
  SetTwo: [],
};

// -- Reducer ---//
export type TAction =
  | {
      type: 'ADD_SETONE';
      action: {
        questionId: number;
        answerId: number;
      };
    }
  | {
      type: 'ADD_SETTWO';
      action: {
        questionId: number;
        answerId: number;
      };
    }
  | { type: 'CLEAR_RESPONSES' };

// Checks if a question has been answered already
export const hasBeenAnswered = (
  state: TResponses,
  questionId: number,
  theSet: string
): boolean => {
  const isAnswered = state[theSet].reduce((acc: boolean, cur: TResponse) => {
    if (acc === true) {
      return true;
    } else if (cur.questionId === questionId) {
      return true;
    } else {
      return false;
    }
  }, false);
  return isAnswered;
};

// Adds a response for a question that has not been answered
export const addResponse = (
  state: TResponses,
  response: TResponse,
  theSet: string
): {
  [x: string]: TResponse[];
} => {
  // if(!setName){
  //   console.error('Please specify which Set to add responses to...')
  //   return state;
  // }
  const newState = {
    ...state,
  };
  const newTheSet = [
    ...state[theSet],
    { questionId: response.questionId, answerId: response.answerId },
  ];

  newState[theSet] = newTheSet;
  return newState;
};

// Updates the response for a question that has already been answered
export const updateResponse = (
  state: TResponses,
  response: TResponse,
  theSet: string
): {
  [x: string]: TResponse[];
} => {
  const newState = {
    ...state,
  };
  const newTheSet = newState.SetOne.map((oldResponse) => {
    if (oldResponse.questionId === response.questionId) {
      return { answerId: response.answerId, questionId: response.questionId };
    } else {
      return oldResponse;
    }
  });
  newState[theSet] = newTheSet;
  return newState;
};

// Reducer function to update state when a response is added/updated
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function responsesReducer(state: TResponses, action: TAction) {
  switch (action.type) {
    case 'ADD_SETONE': {
      const questionId = action.action.questionId;
      const response = action.action;
      if (!hasBeenAnswered(state, questionId, 'SetOne')) {
        return addResponse(state, response, 'SetOne');
      } else {
        return updateResponse(state, response, 'SetOne');
      }
    }
    case 'ADD_SETTWO': {
      if (!hasBeenAnswered(state, action.action.questionId, 'SetTwo')) {
        return addResponse(state, action.action, 'SetTwo');
      } else {
        return updateResponse(state, action.action, 'SetTwo');
      }
    }
    case 'CLEAR_RESPONSES':
      return intialResponses;
    default:
      return state;
  }
}

export const ResponsesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(responsesReducer, intialResponses);
  return (
    <ResponsesContext.Provider value={state}>
      <ResponsesDispatchContext.Provider value={dispatch}>
        {children}
      </ResponsesDispatchContext.Provider>
    </ResponsesContext.Provider>
  );
};
