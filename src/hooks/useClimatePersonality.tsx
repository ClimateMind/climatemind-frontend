import { useContext } from 'react';
import { PersonalityContext } from '../contexts/personality';
import { PersonalityContextDispatch } from '../contexts/personality';
import { TPersonalityContext } from '../types/types';
import { TPersonalValues } from '../types/types';

// TODO: Update to use new scores id
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
  };

  const setPersonalValuesError = () => {
    const newState: TPersonalityContext = {
      data: {} as TPersonalValues,
      isLoading: false,
      isError: true,
    };
    setState(newState);
  };

  const { personalValues } = climatePersonality;
  const { valueScores } = climatePersonality;

  return {
    climatePersonality,
    personalValues,
    valueScores,
    personalValuesError,
    personalValuesLoading,
    clearPersonality,
    setPersonalValuesError,
  };
};
