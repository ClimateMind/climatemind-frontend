import { climateApi } from './apiHelper';

type ClimateEffectsProps = {
  effectId: string;
  effectShortDescription: string;
  effectTitle: string;
  imageUrl: string;
  relatedPersonalValues: string[];
  sharedScore: number;
};

type ClimateSolutionsProps = {
  imageUrl: string;
  sharedScore: number;
  solutionId: string;
  solutionShortDescription: string;
  solutionTitle: string;
};

type ClimateSharedFeedProps = {
  climateEffects: ClimateEffectsProps[];
  climateSolutions: ClimateSolutionsProps[];
};

export const getSharedFeed = async (
  conversationId: string
): Promise<ClimateSharedFeedProps> => {
  try {
    const response = await climateApi.get(
      `conversation/${conversationId}/topics`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
