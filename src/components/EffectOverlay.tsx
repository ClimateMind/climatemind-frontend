import { Box } from '@material-ui/core';
import React from 'react';
import { useAssociatedMyths } from '../hooks/useAssociatedMyths';
import { TActionNodeList } from '../types/Actions';
import { TMyth } from '../types/Myths';
import { TClimateEffect } from '../types/types';
import { ActionNodeList } from './ActionNodeList/ActionNodeList';
import CardHeader from './CardHeader';
import CardOverlay from './CardOverlay';
import MythCard from './MythCard';
import Paragraphs from './Paragraphs';
import SourcesList from './SourcesList';
import TabbedContent from './TabbedContent';

interface DetailsProps {
  longDescription: string;
  solutions: TActionNodeList;
  associatedMyths: any;
}

// Stuff to pass into the details Tab
const Details = ({
  longDescription,
  solutions,
  associatedMyths,
}: DetailsProps) => (
  <>
    <Box p={3}>
      <Paragraphs text={longDescription} />
    </Box>
    <ActionNodeList nodes={solutions} />
    {associatedMyths?.map((item: { data: { myth: TMyth } }, i: number) => (
      <MythCard myth={item.data.myth} key={i} />
    ))}
  </>
);

export interface EffectOverlayProps {
  effect: TClimateEffect;
}

const EffectOverlay: React.FC<EffectOverlayProps> = ({ effect }) => {
  const {
    effectTitle,
    effectDescription,
    imageUrl,
    effectSolutions,
    effectSources,
    effectId,
    effectSpecificMythIRIs,
  } = effect;

  const associatedMyths = useAssociatedMyths(effectSpecificMythIRIs);

  return (
    <CardOverlay
      iri={effectId}
      cardHeader={<CardHeader title={effectTitle} />}
      imageUrl={imageUrl}
    >
      <TabbedContent
        details={
          <Details
            longDescription={effectDescription}
            solutions={effectSolutions}
            associatedMyths={associatedMyths}
          />
        }
        sources={<SourcesList sources={effectSources} />}
      />
    </CardOverlay>
  );
};

export default EffectOverlay;
