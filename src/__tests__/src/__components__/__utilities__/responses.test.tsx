import {
  hasBeenAnswered,
  addResponse,
  updateResponse,
  responsesReducer,
  TAction,
} from '../../../../contexts/responses';

import { TResponses } from '../../../../types/types';

const sampleData: TResponses = {
  SetOne: [
    { questionId: 1, answerId: 1 },
    { questionId: 2, answerId: 1 },
    { questionId: 3, answerId: 1 },
  ],
};

describe('Reducer works correctly', () => {
  it('can check if a question has already been answered', () => {
    const isAnswered = hasBeenAnswered(sampleData, 4); //questionId = 4
    expect(isAnswered).toBe(false);
  });
  it('can add a response', () => {
    const responseToAdd = { questionId: 4, answerId: 2 };
    const updatedState: TResponses = {
      SetOne: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 1 },
        { questionId: 4, answerId: 2 },
      ],
    };
    expect(addResponse(sampleData, responseToAdd)).toStrictEqual(updatedState);
  });
  it('can update a response', () => {
    const responseToUpdate = { questionId: 1, answerId: 2 };
    const updatedState: TResponses = {
      SetOne: [
        { questionId: 1, answerId: 2 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 1 },
        { questionId: 4, answerId: 2 },
      ],
    };
    expect(updateResponse(sampleData, responseToUpdate)).toStrictEqual(
      updatedState
    );
  });
  it('all works together', () => {
    const responseToUpdate = { questionId: 5, answerId: 3 };
    const updatedState: TResponses = {
      SetOne: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 1 },
        { questionId: 4, answerId: 2 },
        { questionId: 5, answerId: 3 },
      ],
    };
    const payload: TAction = {
      type: 'ADD_SETONE',
      action: responseToUpdate,
    };
    expect(responsesReducer(sampleData, payload)).toStrictEqual(updatedState);
  });
});
