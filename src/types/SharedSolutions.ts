
type TRelatedPersonalValue = {
    personalValue: string;
  };
  
export type TRelatedPersonalValues = [TRelatedPersonalValue];

export type TSharedSolution = {
    solutionDescription: string;
    solutionId: string;
    sharedScore: number;
    solutionShortDescription: string;
    solutionTitle: string;
    imageUrl: string;
    relatedPersonalValues: TRelatedPersonalValues;
    solutionSources: string[];
};


  