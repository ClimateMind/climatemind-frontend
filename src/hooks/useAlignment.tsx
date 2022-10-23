import { useContext } from 'react';
import { AlignmentContext, AlignmentDispatch } from '../contexts/alignment';

export const useAlignment = () => {
  const alignment = useContext(AlignmentContext);
  const setAlignment = useContext(AlignmentDispatch);
  const {
    conversationId,
    selectedImpacts,
    selectedSolutions,
    isUserB,
    alignmentScoresId,
    consent,
  } = alignment;

  const setConversationId = (conversationId: string) => {
    const newState = {
      ...alignment,
      conversationId,
    };
    setAlignment?.(newState);
  };

  const setAlignmentScoresId = (alignmentScoresId: string) => {
    const newState = {
      ...alignment,
      alignmentScoresId,
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

  const setConsent = (consent: boolean) => {
    const newState = {
      ...alignment,
      consent,
    };
    setAlignment?.(newState);
  };

  return {
    conversationId,
    alignment,
    selectedImpacts,
    selectedSolutions,
    setConversationId,
    alignmentScoresId,
    setAlignmentScoresId,
    isUserB,
    setIsUserB,
    consent,
    setConsent,
  };
};
