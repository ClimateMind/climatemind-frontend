import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

type TAlignmentContext = {
  conversationId: string;
  selectedImpacts: string[];
  selectedSolutions: string[];
  isUserB: boolean;
  alignmentScoresId: string;
};

export type TAlignmentDispatch = React.Dispatch<
  React.SetStateAction<TAlignmentContext>
>;

export const AlignmentContext = createContext<TAlignmentContext>({} as TAlignmentContext);
// export const AlignmentContext = createContext<TAlignmentContext>(initialState);
export const AlignmentDispatch = createContext<TAlignmentDispatch | null>(null);

export const AlignmentProvider: React.FC = ({ children }) => {
  
  const [alignmentScoresIdFromStorage] = useLocalStorage('alignmentScoresId', '');
  
  const initialState = {
    conversationId: '',
    selectedImpacts: [] as string[],
    selectedSolutions: [] as string[],
    isUserB: false,
    alignmentScoresId: alignmentScoresIdFromStorage,
  };
  
  const [alignment, setAlignment] = useState(initialState);

  // We need to get the alignmentScoresId from localStorage, if any is set, in case the user refreshes the browser
  useEffect(() => {
    setAlignment((prevState) => ({
      ...prevState,
      alignmentScoresId: alignmentScoresIdFromStorage,
    }));
  }, [alignmentScoresIdFromStorage]);


  return (
    <AlignmentContext.Provider value={alignment}>
      <AlignmentDispatch.Provider value={setAlignment}>
        {children}
      </AlignmentDispatch.Provider>
    </AlignmentContext.Provider>
  );
};
