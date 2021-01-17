import React from 'react';
import { Box } from '@material-ui/core';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
import SourcesList from './SourcesList';
import TabbedContent from './TabbedContent';
import { TSolution } from '../types/Solutions';
import { TMyth } from '../types/Myths';
import { Typography } from '@material-ui/core';
import MythCard from './MythCard';
import { useAssociatedMyths } from '../hooks/useAssociatedMyths';

interface DetailsProps {
  solution: TSolution;
  associatedMyths: any;
}

export interface SolutionOverlayProps {
  solution: TSolution;
}

// Stuff to pass into the details Tab
const Details = ({ solution, associatedMyths }: DetailsProps) => (
  <>
    <Box p={3}>
      <Typography variant="body1">{solution.longDescription}</Typography>
    </Box>
    {associatedMyths?.map((item: { data: { myth: TMyth } }, i: number) => (
      <MythCard myth={item.data.myth} key={i} />
    ))}
  </>
);

const SolutionOverlay: React.FC<SolutionOverlayProps> = ({ solution }) => {
  //Get Myth for this solution
  const mythsIris = solution.solutionSpecificMythIRIs;
  const associatedMyths = useAssociatedMyths(mythsIris);

  return (
    <CardOverlay
      iri={solution.iri}
      cardHeader={
        <CardHeader
          title={solution.solutionTitle}
          cardIcon={solution.solutionType}
          preTitle={`${solution.solutionType} action`}
        />
      }
      imageUrl={solution.imageUrl}
      openButtonText="MORE"
    >
      <TabbedContent
        details={
          <Details solution={solution} associatedMyths={associatedMyths} />
        }
        sources={<SourcesList sources={solution.solutionSources} />}
      />
    </CardOverlay>
  );
};

export default SolutionOverlay;
