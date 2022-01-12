import React, { createContext, useState } from 'react';

export type TAlignmentContext = {
  conversationId: string;
  alignmentId: string;
  selectedImpacts: string[];
  selectedSolutions: string[];
  isUserB: boolean;
};

export type TAlignmentDispatch = React.Dispatch<
  React.SetStateAction<TAlignmentContext>
>;

const initialState = {
  conversationId: '',
  alignmentId: '',
  selectedImpacts: [] as string[],
  selectedSolutions: [] as string[],
  isUserB: false,
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
