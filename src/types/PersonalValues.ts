export type TPersonalValueIds =
  | 'hedonism'
  | 'stimulation'
  | 'security'
  | 'conformity'
  | 'benevolence'
  | 'tradition'
  | 'universalism'
  | 'self_direction'
  | 'achievement'
  | 'power';

type TValueScore = {
  personalValue: string;
  score: number;
};

export type TPersonalValue = {
  description: string;
  id: TPersonalValueIds;
  name: string;
  shortDescription: string;
  score?: number; // Score is not returned by the GET Personal Values Endpoint
};

export type TPersonalValues = {
  personalValues: [TPersonalValue];
  valueScores: [TValueScore];
};
