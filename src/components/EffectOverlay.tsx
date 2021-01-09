import React, { useEffect }  from 'react';
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
import { useQueries } from 'react-query';
import { getOneMyth } from '../api/getOneMyth';
import MythCard from './MythCard';

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
    <p>MYTHS</p>
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

  const mythsIris = ['RCqODufKJse3xkgAny5v5fI', 'RXlELjsOUaVbJqmvO91WFL'];
  const associatedMyths = useQueries(
    mythsIris.map(myth => {
      return {
        queryKey: ['myth', myth],
        queryFn: () => getOneMyth(myth),
      }
    })
  )

  useEffect(() => {
    console.log('mythQueries', associatedMyths);
    console.log('effectSpecificMythIRIs', effectSpecificMythIRIs);
  },[associatedMyths]);

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
