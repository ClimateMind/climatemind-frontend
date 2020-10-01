import { useContext } from 'react';
// import { ClimatePersonalityContext } from '../contexts/personality';

export const useClimatePersonality = () => {
//   const climatePersonality = useContext(ClimatePersonalityContext);

const climatePersonality = [
    {
      valueDesc:
        'What is important to you is the safety, harmony and stability of society, of relationships, and of self. Security values derive from basic individual and group needs. You value a sense of belonging, social order and the reciprocation of favours.',
      valueName: 'security',
    },
    {
      valueDesc:
        "For you, respect, commitment and acceptance of the customs and ideas that one's culture or religion provides is highly important. It’s likely you practise a form of religious rites and beliefs. You are humble, devout and accepting of your portion in life.",
      valueName: 'tradition',
    },
    {
      valueDesc:
        'You are excellent at restraint of actions, inclinations, and impulses likely to upset or harm others and violate social expectations or norms. Conformity values derive from the requirement that individuals inhibit inclinations that might disrupt and undermine smooth interaction and group functioning. You are obedient, self-disciplined, loyal, responsible and polite.',
      valueName: 'conformity',
    },
  ];

  return climatePersonality;
};
