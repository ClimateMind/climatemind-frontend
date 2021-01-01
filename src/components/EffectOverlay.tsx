import React from 'react';
import { Box } from '@material-ui/core';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
import SourcesList from './SourcesList';
import TabbedContent from './TabbedContent';
import ActionNodeList from './ActionNodeList';
import { TClimateEffect } from '../types/types';
import { TActionNodeList } from '../types/Actions';
import { Typography } from '@material-ui/core';

interface DetailsProps {
  shortDescription: string;
  longDescription: string;
  solutions: TActionNodeList;
}

// Stuff to pass into the details Tab
const Details = ({
  shortDescription,
  longDescription,
  solutions,
}: DetailsProps) => (
  <>
    <Box p={3}>
      <Typography variant="body1">{shortDescription}</Typography>
      <Typography variant="body1">{longDescription}</Typography>
    </Box>
    <ActionNodeList nodes={solutions} />
  </>
);

export interface EffectOverlayProps {
  effect: TClimateEffect;
}

const EffectOverlay: React.FC<EffectOverlayProps> = ({ effect }) => {
  const {
    effectTitle,
    effectDescription,
    effectShortDescription,
    imageUrl,
    effectSolutions,
    effectSources,
  } = effect;
  return (
    <CardOverlay
      cardHeader={<CardHeader title={effectTitle} />}
      imageUrl={imageUrl}
    >
      <TabbedContent
        details={
          <Details
            shortDescription={effectShortDescription}
            longDescription={effectDescription}
            solutions={effectSolutions}
          />
        }
        sources={<SourcesList sources={effectSources} />}
      />
    </CardOverlay>
  );
};

export default EffectOverlay;
