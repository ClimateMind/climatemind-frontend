type TRelatedPersonalValue = {
  personalValue: string;
};

export type TRelatedPersonalValues = [TRelatedPersonalValue];

export type TSharedImpact = {
  effectDescription: string;
  effectId: string;
  sharedScore: number;
  effectShortDescription: string;
  effectTitle: string;
  imageUrl: string;
  relatedPersonalValues: TRelatedPersonalValues;
  effectSources: string[];
};

export type TSharedImpacts = TSharedImpact[];
