import React, { createContext, useState } from 'react';

import { TQuestionResponses } from '../types/types';

const testQuestionResponses: TQuestionResponses = {
  SetOne: [
    // { questionId: 1, answerId: 1 },
    // { questionId: 2, answerId: 1 },
    // { questionId: 3, answerId: 1 },
    // { questionId: 4, answerId: 1 },
    // { questionId: 5, answerId: 1 },
    // { questionId: 6, answerId: 1 },
    // { questionId: 7, answerId: 1 },
    // { questionId: 8, answerId: 1 },
    // { questionId: 9, answerId: 1 },
    // { questionId: 10, answerId: 1 },
  ],
};

export const QuestionResponsesContext = createContext<TQuestionResponses>(
  {} as TQuestionResponses
);

export const QuestionResponsesProvider: React.FC = ({ children }) => {
  const [responses] = useState(testQuestionResponses);

  return (
    <QuestionResponsesContext.Provider value={responses}>
      {children}
    </QuestionResponsesContext.Provider>
  );
};
