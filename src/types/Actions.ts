export type TAction = {
  iri: string;
  solutionTitle: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  solutionSources: string[];
  solutionType?: 'adaptation' | 'mitigation';
};

export type TActionNodeList = TAction[];
