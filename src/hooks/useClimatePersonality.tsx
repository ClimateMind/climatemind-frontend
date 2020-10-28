import { useContext } from 'react';
import { PersonalityContext } from '../contexts/personality';

export const useClimatePersonality = () => {
  const state = useContext(PersonalityContext);
  const climatePersonality = state.data;
  const personalValuesError = state.isError;
  const personalValuesLoading = state.isLoading;

  return { climatePersonality, personalValuesError, personalValuesLoading };
};
