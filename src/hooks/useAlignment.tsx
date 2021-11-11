import { useContext } from 'react';
import { AlignmentContext } from '../contexts/alignment';

export const useAlignment = () => {
  const state = useContext(AlignmentContext);
  const conversationId = state.conversationId;
  const selectedImpacts = state.selectedImpacts;
  const selectedSolutions = state.selectedSolutions;
  const setConversationId = state.setConversationId;
  // TODO:
  // setSelectedImpacts = ...
  // setSelectedSolutions = ...

  return { conversationId, selectedImpacts, selectedSolutions, setConversationId };
};
