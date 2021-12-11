import { useContext } from 'react';
import { AlignmentContext, AlignmentDispatch } from '../contexts/alignment';

export const useAlignment = () => {
  const alignment = useContext(AlignmentContext);
  const setAlignment = useContext(AlignmentDispatch);
  const {
    alignmentId,
    conversationId,
    selectedImpacts,
    selectedSolutions,
    isUserB,
  } = alignment;

  const setConversationId = (conversationId: string) => {
    const newState = {
      ...alignment,
      conversationId,
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

  const setAlignmentId = (alignmentId: string) => {
    const newState = {
      ...alignment,
      alignmentId,
    };
    setAlignment?.(newState);
  };

  // TODO:
  // setSelectedImpacts = ...
  // setSelectedSolutions = ...

  return {
    conversationId,
    alignmentId,
    setAlignmentId,
    selectedImpacts,
    selectedSolutions,
    setConversationId,
    isUserB,
    setIsUserB,
  };
};
