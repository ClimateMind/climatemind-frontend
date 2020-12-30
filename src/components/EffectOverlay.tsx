import React from 'react';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
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
    <Typography variant="body1">{shortDescription}</Typography>
    <Typography variant="body1">{longDescription}</Typography>
    <ActionNodeList nodes={solutions} />
  </>
);

export interface EffectOverlayProps {
  effect: TClimateEffect;
}

const ActionOverlay: React.FC<EffectOverlayProps> = ({ effect }) => {
  const {
    effectTitle,
    effectDescription,
    effectShortDescription,
    imageUrl,
    effectSolutions,
  } = effect;
  return (
    <CardOverlay
      cardHeader={<CardHeader title={effectTitle} />}
      shortDescription="This is the short desc"
      imageUrl={imageUrl}
      isAction={true}
    >
      <TabbedContent
        details={
          <Details
            shortDescription={effectShortDescription}
            longDescription={effectDescription}
            solutions={effectSolutions}
          />
        }
        sources={[]} // Sources to come later
      />
    </CardOverlay>
  );
};

export default ActionOverlay;
