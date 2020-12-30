import React from 'react';
import { Box } from '@material-ui/core';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
import SourcesList from './SourcesList';
import ActionTabbedContent from './TabbedContent';
import { TAction } from '../types/Actions';
import { Typography } from '@material-ui/core';

export interface ActionOverlayProps {
  action: TAction;
}

interface DetailsProps {
  shortDescription: string;
  longDescription: string;
}

// Stuff to pass into the details Tab
const Details = ({ shortDescription, longDescription }: DetailsProps) => (
  <>
    <Box p={3}>
      <Typography variant="body1">{shortDescription}</Typography>
      <Typography variant="body1">{longDescription}</Typography>
    </Box>
  </>
);

const ActionOverlay: React.FC<ActionOverlayProps> = ({ action }) => {
  const { solutionTitle, longDescription, imageUrl, solutionType } = action;
  return (
    <CardOverlay
      cardHeader={
        <CardHeader
          title={solutionTitle}
          cardIcon={solutionType}
          preTitle={`${solutionType} solution`}
        />
      }
      shortDescription="This is the short desc"
      imageUrl={imageUrl}
      title={solutionTitle}
      description={longDescription}
      isAction={true}
    >
      <ActionTabbedContent
        action={action}
        details={
          <Details
            shortDescription={action.shortDescription}
            longDescription={action.longDescription}
          />
        }
        sources={<SourcesList sources={[]} />} // Sources to come later
      />
    </CardOverlay>
  );
};

export default ActionOverlay;
