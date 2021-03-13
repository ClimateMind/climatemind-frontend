import {
  hasBeenAnswered,
  addResponse,
  updateResponse,
  responsesReducer,
  TAction,
} from '../../../contexts/responses';

import { TResponses } from '../../../types/types';

const sampleData: TResponses = {
  SetOne: [
    { questionId: 1, answerId: 1 },
    { questionId: 2, answerId: 1 },
    { questionId: 3, answerId: 1 },
  ],
  SetTwo: [
    { questionId: 1, answerId: 1 },
    { questionId: 2, answerId: 1 },
  ],
};

describe('Reducer works correctly', () => {
  it('can check if a question has already been answered', () => {
    const isAnswered = hasBeenAnswered(sampleData, 4, 'SetOne'); //questionId = 4
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
      SetTwo: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
      ],
    };
    expect(addResponse(sampleData, responseToAdd, 'SetOne')).toStrictEqual(updatedState);
  });

  it('can add a response to set two', () => {
    const responseToAdd = { questionId: 3, answerId: 6 };
    const updatedState: TResponses = {
      SetOne: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 1 },
      ],
      SetTwo: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 6 },
      ],
    };
    expect(addResponse(sampleData, responseToAdd, 'SetTwo')).toStrictEqual(updatedState);
  });

  it('can update a response', () => {
    const responseToUpdate = { questionId: 1, answerId: 2 };
    const updatedState: TResponses = {
      SetOne: [
        { questionId: 1, answerId: 2 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 1 },
      ],
      SetTwo: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
      ],
    };
    expect(updateResponse(sampleData, responseToUpdate, 'SetOne')).toStrictEqual(
      updatedState
    );
  });

  it('can update a response from set two', () => {
    const responseToUpdate = { questionId: 2, answerId: 6 };
    const updatedState: TResponses = {
      SetOne: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 1 },
      ],
      SetTwo: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 6 },
        { questionId: 3, answerId: 1 },
      ],
    };
    expect(updateResponse(sampleData, responseToUpdate, 'SetTwo')).toStrictEqual(
      updatedState
    );
  });

  it('all works together', () => {
    const responseToAdd = { questionId: 5, answerId: 3 };
    const updatedState: TResponses = {
      SetOne: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
        { questionId: 3, answerId: 1 },
        { questionId: 5, answerId: 3 },
      ],
      SetTwo: [
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 1 },
      ],
    };
    const payload: TAction = {
      type: 'ADD_SETONE',
      action: responseToAdd,
    };
    expect(responsesReducer(sampleData, payload)).toStrictEqual(updatedState);
  });

  it('can clear the responses', () => {
    const updatedState: TResponses = {
      SetOne: [],
      SetTwo: []
    };

    const payload: TAction = {
      type: 'CLEAR_RESPONSES',
    };
    expect(responsesReducer(sampleData, payload)).toStrictEqual(updatedState);
  });
});
