export type TAction = {
  solutionTitle: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  solutionType?: 'adaptation' | 'mitigation';
};

export type TActionNodeList = TAction[];
