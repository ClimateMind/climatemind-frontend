import { createContext, useEffect, useState } from 'react';

export type TAlignmentContext = {
  conversationId: string;
  selectedImpacts: string[];
  selectedSolutions: string[];
  isUserB: boolean;
  alignmentScoresId: string;
  consent: boolean;
};

export type TAlignmentDispatch = React.Dispatch<
  React.SetStateAction<TAlignmentContext>
>;

const initialState = {
  conversationId: '',
  selectedImpacts: [] as string[],
  selectedSolutions: [] as string[],
  isUserB: false,
  alignmentScoresId: '',
  consent: false,
};

export const AlignmentContext = createContext<TAlignmentContext>(initialState);
export const AlignmentDispatch = createContext<TAlignmentDispatch | null>(null);

interface Props {
  children: React.ReactNode;
}

export function AlignmentProvider({ children }: Props) {
  const alignmentScoresIdFromStorage = localStorage.getItem('alignmentScoresId');

  const initialState = {
    conversationId: '',
    selectedImpacts: [] as string[],
    selectedSolutions: [] as string[],
    isUserB: false,
    alignmentScoresId: '',
    consent: false,
  };

  const [alignment, setAlignment] = useState(initialState);

  // We need to get the alignmentScoresId from localStorage, if any is set, in case the user refreshes the browser
  useEffect(() => {
    setAlignment((prevState) => ({
      ...prevState,
      alignmentScoresId: alignmentScoresIdFromStorage ?? '',
    }));
  }, [alignmentScoresIdFromStorage]);

  return (
    <AlignmentContext.Provider value={alignment}>
      <AlignmentDispatch.Provider value={setAlignment}>
        {children}
      </AlignmentDispatch.Provider>
    </AlignmentContext.Provider>
  );
}
