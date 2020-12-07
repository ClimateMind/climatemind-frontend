export type TAction = {
  title: string;
  shortDescription: string;
  description?: string;
  imageUrl: string;
  // actionType: string;
  actionType: any;
};

export type TActionNodeList = TAction[];
