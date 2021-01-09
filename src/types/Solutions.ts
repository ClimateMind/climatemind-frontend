export type TSolution = {
  iri: string;
  imageUrl: string;
  longDescription: string;
  shortDescription: string;
  solutionTitle: string;
  solutionSources: string[];
  solutionType: 'adaptation' | 'mitigation';
};

export type TSolutions = TSolution[];
