
type TRelatedPersonalValue = {
  personalValue: string;
};

export type TSharedImpact = {
  effectDescription: string;
  effectId: string;
  sharedScore: number;
  effectShortDescription: string;
  effectTitle: string;
  imageUrl: string;
  relatedPersonalValues: [TRelatedPersonalValue]
  effectSources: string[];
};

export type TSharedImpacts = TSharedImpact[];