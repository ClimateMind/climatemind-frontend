import React, { createContext, useState, useEffect } from 'react';

type TAlignmentContext = {
  conversationId: string;
  selectedImpacts: string[];
  selectedSolutions: string[];
  setConversationId?: (conversationId: string) => any;
  // TODO:
  // setSelectedImpacts:
  // setSelectedSolutions:
};

const initialState = {
  conversationId: '',
  selectedImpacts: [],
  selectedSolutions: [],
};

export const AlignmentContext = createContext<TAlignmentContext>(initialState);

export const AlignmentProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [conversationId, setConversationId] = useState(state.conversationId);
  // TODO: setSelectedImpacts ans solutions to be used later
  // const [selectedImpacts, setSelectedImpacts] = useState(state.selectedImpacts);
  // const [selectedSolutions, setSelectedSolutions] = useState(state.selectedSolutions);
  const [selectedImpacts] = useState(state.selectedImpacts);
  const [selectedSolutions] = useState(state.selectedSolutions);

  

  // Update the state
  useEffect(() => {
    const newState = {
      conversationId,
      selectedImpacts,
      selectedSolutions,
    };
    setState(newState);
  }, [setState, conversationId, selectedImpacts, selectedSolutions]);

  return (
      <AlignmentContext.Provider value={{...state, setConversationId }}>
      {children}
    </AlignmentContext.Provider>
  );
};
