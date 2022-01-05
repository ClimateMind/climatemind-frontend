import { useContext } from 'react';
import { AlignmentContext, AlignmentDispatch } from '../contexts/alignment';

export const useAlignment = () => {
  const alignment = useContext(AlignmentContext);
  const setAlignment = useContext(AlignmentDispatch);
  const { conversationId, selectedImpacts, selectedSolutions, isUserB, alignmentId } =
    alignment;

  const setConversationId = (conversationId: string) => {
    const newState = {
      ...alignment,
      conversationId,
    };
    setAlignment?.(newState);
  };
  
  const setAlignmentId = (alignmentId: string) => {
    const newState = {
      ...alignment,
      alignmentId,
    };
    setAlignment?.(newState);
  };

  const setIsUserB = (isUserB: boolean, conversationId: string) => {
    const newState = {
      ...alignment,
      conversationId,
      isUserB,
    };
    setAlignment?.(newState);
  };

  // TODO:
  // setSelectedImpacts = ...
  // setSelectedSolutions = ...

  return {
    conversationId,
    selectedImpacts,
    selectedSolutions,
    setConversationId,
    alignmentId,
    setAlignmentId,
    isUserB,
    setIsUserB,
  };
};
