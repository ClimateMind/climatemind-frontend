import React, { createContext, useReducer } from 'react';
import { TResponses, TResponse } from '../types/types';

// -- Context Provider ---//
export const ResponsesContext = createContext<TResponses>({} as TResponses);
export const ResponsesDispatchContext = createContext<React.Dispatch<any>>(
  () => null
);

// -- Reducer ---//
export type TAction = {
  type: 'ADD_SETONE';
  action: {
    questionId: number;
    answerId: number;
  };
};

// Checks if a question has been answered already
export const hasBeenAnswered = (state: TResponses, questionId: number) => {
  const isAnswered = state.SetOne.reduce((acc: boolean, cur: TResponse) => {
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
export const addResponse = (state: TResponses, response: TResponse) => {
  const newState = {
    ...state,
  };
  const newSetOne = [
    ...state.SetOne,
    { questionId: response.questionId, answerId: response.answerId },
  ];

  newState.SetOne = newSetOne;
  return newState;
};

// Updates the response for a question that has already been answered
export const updateResponse = (state: TResponses, response: TResponse) => {
  const newState = {
    ...state,
  };
  const newSetOne = newState.SetOne.map((oldResponse) => {
    if (oldResponse.questionId === response.questionId) {
      return { answerId: response.answerId, questionId: response.questionId };
    } else {
      return oldResponse;
    }
  });
  newState.SetOne = newSetOne;
  return newState;
};

// Reducer function to update state when a response is added/updated
export function responsesReducer(state: TResponses, action: TAction) {
  switch (action.type) {
    case 'ADD_SETONE':
      const questionId = action.action.questionId;
      const response = action.action;
      if (!hasBeenAnswered(state, questionId)) {
        return addResponse(state, response);
      } else {
        return updateResponse(state, response);
      }
    default:
      return state;
  }
}

// --- use Responses Hook ---//
const intialResponses: TResponses = {
  SetOne: [],
};

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
