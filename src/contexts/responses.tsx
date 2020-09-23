import React, { createContext, useReducer } from 'react';
import { TResponses, TResponse } from '../types/types';

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
  newState.SetOne.push({
    questionId: response.questionId,
    answerId: response.answerId,
  });
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

// TO DO - The Assumption at present is that each time we are supplied a question, in it will have not yet been answered. Need to add the functionality to check if the question has already been answered and update if if has.
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
  }
}

// --- use Responses Hook ---//
const intialResponses: TResponses = {
  SetOne: [],
};

export const useResponses = () => {
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
