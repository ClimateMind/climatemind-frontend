type climateSolution = {
  imageUrl: string;
  sharedScore: number;
  solutionTitle: string;
  solutionId: string;
  solutionShortDescription: string;
  solutionType: string[];
};

type climateEffect = {
  effectId: string;
  sharedScore: number;
  effectShortDescription: string;
  effectTitle: string;
  imageUrl: string;
  relatedPersonalValues: string[];
  isPossiblyLocal: boolean;
};

export type TSelectedTopics = {
  climateEffects: climateEffect[];
  climateSolutions: climateSolution[];
};
