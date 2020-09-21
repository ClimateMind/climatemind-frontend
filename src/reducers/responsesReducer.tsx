import { TResponses } from '../types/types';

type Action = {
  type: 'ADD_SETONE';
  action: {
    questionId: number;
    answerId: number;
  };
};

// ToDo - The Assumption at present is that each time we are supplied a question, in it will have not yet been answered. Need to add the functionality to check if the question has already been answered and update if if has.

function responsesReducer(state: TResponses, action: Action) {
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
export default responsesReducer;
