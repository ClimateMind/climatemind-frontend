import { useContext } from 'react';
import { PersonalityContext } from '../contexts/personality';
import { PersonalityContextDispatch } from '../contexts/personality';
import { TPersonalityContext } from '../types/types';
import { TPersonalValues } from '../types/types';

export const useClimatePersonality = () => {
  const state = useContext(PersonalityContext);
  const setState = useContext(PersonalityContextDispatch);
  const climatePersonality = state.data;
  const personalValuesError = state.isError;
  const personalValuesLoading = state.isLoading;

  const clearPersonality = () => {
    const newState: TPersonalityContext = {
      data: {} as TPersonalValues,
      isLoading: false,
      isError: false,
    };
    setState(newState);
    console.log('clearPersonality');
  };

  return {
    climatePersonality,
    personalValuesError,
    personalValuesLoading,
    clearPersonality,
  };
};
