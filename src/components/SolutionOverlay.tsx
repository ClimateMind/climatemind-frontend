import React from 'react';
import { Box } from '@material-ui/core';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
import SourcesList from './SourcesList';
import TabbedContent from './TabbedContent';
import { TSolution } from '../types/Solutions';
import { Typography } from '@material-ui/core';

interface DetailsProps {
  solution: TSolution;
}

export interface SolutionOverlayProps {
  solution: TSolution;
}

// Stuff to pass into the details Tab
const Details = ({ solution }: DetailsProps) => (
  <>
    <Box p={3}>
      <Typography variant="body1">{solution.shortDescription}</Typography>
      <Typography variant="body1">{solution.longDescription}</Typography>
    </Box>
  </>
);


const SolutionOverlay: React.FC<SolutionOverlayProps> = ({ solution }) => {
  
  return (
    <CardOverlay
      cardHeader={<CardHeader title={solution.solutionTitle} />}
      imageUrl={solution.imageUrl}
    >
      <TabbedContent
        details={
          <Details solution={solution}/>
        }
        sources={'jool'} 
      />
    </CardOverlay>
  );
};

export default SolutionOverlay;
