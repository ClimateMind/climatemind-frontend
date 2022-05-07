import { TPersonalValueIds } from './PersonalValues';
import { TPersonalValue } from './PersonalValues';

export type TAlignment = {
  overallSimilarityScore: number;
  topMatchPercent: number;
  topMatchValue: TPersonalValueIds;
  userAName: string;
  userBName: string;
  valueAlignment: TPersonalValue[];
};
