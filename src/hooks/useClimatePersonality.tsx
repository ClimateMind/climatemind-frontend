import { useContext } from 'react';
import { PersonalityContext } from '../contexts/personality';

export const useClimatePersonality = () => {
  const climatePersonality = useContext(PersonalityContext);
  
  return climatePersonality;
};