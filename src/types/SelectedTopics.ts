export type climateSolution = {
  solutionId: string;
  solutionTitle: string;
  solutionType: string[];
  solutionShortDescription: string;
  imageUrl: string;
  sharedScore: number;
};

export type climateEffect = {
  effectId: string;
  effectTitle: string;
  effectShortDescription: string;
  imageUrl: string;
  sharedScore: number;
  relatedPersonalValues: string[];
  isPossiblyLocal: boolean;
};

export type TSelectedTopics = {
  climateEffects: climateEffect[];
  climateSolutions: climateSolution[];
};
