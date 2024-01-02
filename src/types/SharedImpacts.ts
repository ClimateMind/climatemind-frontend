// type TRelatedPersonalValue = {
//   personalValue: string;
// };

// export type TRelatedPersonalValues = [TRelatedPersonalValue];

export type TSharedImpact = {
  effectId: string;
  effectTitle: string;
  effectShortDescription: string;
  effectDescription: string;
  sharedScore: number;
  imageUrl: string;
  // relatedPersonalValues: TRelatedPersonalValues;
  relatedPersonalValues: string[];
  effectSources: string[];
};

// export type TSharedImpacts = TSharedImpact[];
