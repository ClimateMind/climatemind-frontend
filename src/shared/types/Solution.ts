type Solution = {
  iri: string;
  imageUrl: string;
  longDescription: string;
  shortDescription: string;
  solutionTitle: string;
  solutionSources: string[];
  solutionType: 'adaptation' | 'mitigation';
  solutionSpecificMythIRIs: string[];
};

export default Solution;
