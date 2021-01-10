import React  from 'react';
import { Box } from '@material-ui/core';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
import SourcesList from './SourcesList';
import TabbedContent from './TabbedContent';
import ActionNodeList from './ActionNodeList';
import { TClimateEffect } from '../types/types';
import { TActionNodeList } from '../types/Actions';
import { TMyth } from '../types/Myths';
import { Typography } from '@material-ui/core';
import MythCard from './MythCard';
import { useAssociatedMyths } from '../hooks/useAssociatedMyths';

interface DetailsProps {
  shortDescription: string;
  longDescription: string;
  solutions: TActionNodeList;
  associatedMyths: any;
}

// Stuff to pass into the details Tab
const Details = ({
  shortDescription,
  longDescription,
  solutions,
  associatedMyths
}: DetailsProps) => (
  <>
    <Box p={3}>
      <Typography variant="body1">{shortDescription}</Typography>
      <Typography variant="body1">{longDescription}</Typography>
    </Box>
    <ActionNodeList nodes={solutions} />
    {associatedMyths?.map((item: { data: { myth: TMyth; }; }, i: string | number | null | undefined) => (
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
    effectShortDescription,
    imageUrl,
    effectSolutions,
    effectSources,
    effectSpecificMythIRIs,
  } = effect;

  const iris = ['RCqODufKJse3xkgAny5v5fI', 'RXlELjsOUaVbJqmvO91WFL'];
  const associatedMyths = useAssociatedMyths(iris);
  // const associatedMyths = useAssociatedMyths(effectSpecificMythIRIs);

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
            associatedMyths={associatedMyths}
          />
        }
        sources={<SourcesList sources={effectSources} />}
      />
    </CardOverlay>
  );
};

export default EffectOverlay;
