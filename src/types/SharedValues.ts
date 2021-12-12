import { TPersonalValue } from './PersonalValues';

export interface TSharedValues {
  alignmentScore: [TPersonalValue];
  overallSimilarityScore: number;
  userAName: string;
  userBName: string;
}
