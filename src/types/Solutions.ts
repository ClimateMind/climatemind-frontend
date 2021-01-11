export type TSolution = {
  id: string;
  imageUrl: string;
  longDescription: string;
  shortDescription: string;
  solutionTitle: string;
  solutionType: 'adaptation' | 'mitigation';
  solutionSpecificMythIRIs: string[];
};

export type TSolutions = TSolution[];
