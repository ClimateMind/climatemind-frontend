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
  longDescription: string;
}

// Stuff to pass into the details Tab
const Details = ({ longDescription }: DetailsProps) => (
  <>
    <Box p={3}>
      <Typography variant="body1">{longDescription}</Typography>
    </Box>
  </>
);

const ActionOverlay: React.FC<ActionOverlayProps> = ({ action }) => {
  const {
    solutionTitle,
    imageUrl,
    solutionType,
    solutionSources,
    iri,
  } = action;
  return (
    <CardOverlay
      iri={iri}
      cardHeader={
        <CardHeader
          title={solutionTitle}
          cardIcon={solutionType}
          preTitle={`${solutionType} action`}
        />
      }
      imageUrl={imageUrl}
      title={solutionTitle}
      isAction={true}
    >
      <ActionTabbedContent
        action={action}
        details={<Details longDescription={action.longDescription} />}
        sources={<SourcesList sources={solutionSources} />} // Sources to come later
      />
    </CardOverlay>
  );
};

export default ActionOverlay;
