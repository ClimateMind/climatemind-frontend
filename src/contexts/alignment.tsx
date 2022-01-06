import React, { createContext, useState } from 'react';

type TAlignmentContext = {
  conversationId: string;
  selectedImpacts: string[];
  selectedSolutions: string[];
  isUserB: boolean;
  alignmentId: string;
};

export type TAlignmentDispatch = React.Dispatch<
  React.SetStateAction<TAlignmentContext>
>;

const initialState = {
  conversationId: '',
  selectedImpacts: [] as string[],
  selectedSolutions: [] as string[],
  isUserB: false,
  alignmentId: '',
};

export const AlignmentContext = createContext<TAlignmentContext>(initialState);
export const AlignmentDispatch = createContext<TAlignmentDispatch | null>(null);

export const AlignmentProvider: React.FC = ({ children }) => {
  const [alignment, setAlignment] = useState(initialState);

  return (
    <AlignmentContext.Provider value={alignment}>
      <AlignmentDispatch.Provider value={setAlignment}>
        {children}
      </AlignmentDispatch.Provider>
    </AlignmentContext.Provider>
  );
};
