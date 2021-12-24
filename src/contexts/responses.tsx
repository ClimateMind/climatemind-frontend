import React, { createContext, useReducer } from 'react';
import { TResponses, TResponse } from '../types/types';

// -- Context Provider ---//
export const ResponsesContext = createContext<TResponses>({} as TResponses);
export const ResponsesDispatchContext = createContext<React.Dispatch<any>>(
  () => null
);

const intialResponses: TResponses = {
  SetOne: [],
  SetTwo: [],
};

const mockResponses: TResponses = {
  SetOne: [
    {
      answerId: 6,
      questionId: 10,
    },
    {
      questionId: 9,
      answerId: 6,
    },
    {
      questionId: 8,
      answerId: 4,
    },
    {
      questionId: 7,
      answerId: 3,
    },
    {
      questionId: 6,
      answerId: 3,
    },
    {
      questionId: 5,
      answerId: 6,
    },
    {
      questionId: 4,
      answerId: 6,
    },
    {
      questionId: 3,
      answerId: 6,
    },
    {
      questionId: 2,
      answerId: 5,
    },
    {
      questionId: 1,
      answerId: 6,
    },
  ],
  SetTwo: [
    {
      answerId: 6,
      questionId: 20,
    },
    {
      questionId: 19,
      answerId: 6,
    },
    {
      questionId: 18,
      answerId: 4,
    },
    {
      questionId: 17,
      answerId: 3,
    },
    {
      questionId: 16,
      answerId: 3,
    },
    {
      questionId: 15,
      answerId: 6,
    },
    {
      questionId: 14,
      answerId: 6,
    },
    {
      questionId: 13,
      answerId: 6,
    },
    {
      questionId: 12,
      answerId: 5,
    },
    {
      questionId: 11,
      answerId: 6,
    },
  ],
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
) => {
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
) => {
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
) => {
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
export function responsesReducer(state: TResponses, action: TAction) {
  switch (action.type) {
    case 'ADD_SETONE':
      const questionId = action.action.questionId;
      const response = action.action;
      if (!hasBeenAnswered(state, questionId, 'SetOne')) {
        return addResponse(state, response, 'SetOne');
      } else {
        return updateResponse(state, response, 'SetOne');
      }
    case 'ADD_SETTWO':
      if (!hasBeenAnswered(state, action.action.questionId, 'SetTwo')) {
        return addResponse(state, action.action, 'SetTwo');
      } else {
        return updateResponse(state, action.action, 'SetTwo');
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

export const MockResponsesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(responsesReducer, mockResponses);

  console.log({ mocks: state });
  return (
    <ResponsesContext.Provider value={state}>
      <ResponsesDispatchContext.Provider value={dispatch}>
        {children}
      </ResponsesDispatchContext.Provider>
    </ResponsesContext.Provider>
  );
};
