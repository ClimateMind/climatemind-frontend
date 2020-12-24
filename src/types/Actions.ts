export type TAction = {
  solutionTitle: string;
  shortDescription: string;
  description?: string;
  imageUrl: string;
  solutionType?: 'adaptation' | 'mitigation';
};

export type TActionNodeList = TAction[];
