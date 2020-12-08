export type TAction = {
  title: string;
  shortDescription: string;
  description?: string;
  imageUrl: string;
  actionType?: 'protection' | 'prevention';
};

export type TActionNodeList = TAction[];
