import Solution from './Solution';

type ClimateEffect = {
  effectId: string;
  effectTitle: string;
  effectDescription: string;
  effectShortDescription: string;
  effectSolutions: Solution[];
  effectSources: string[];
  effectScore: number;
  imageUrl: string;
  actionHeadline: string;
  isPossiblyLocal: 0 | 1;
  effectSpecificMythIRIs: string[];
  relatedPersonalValues?: string[];
};

export default ClimateEffect;
