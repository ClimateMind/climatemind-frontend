export type TAction = {
  iri: string;
  solutionTitle: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  solutionSources: string[];
  solutionType?: 'adaptation' | 'mitigation';
  solutionSpecificMythIRIs?: string[];
};

export type TActionNodeList = TAction[];
