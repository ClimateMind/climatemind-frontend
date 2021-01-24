import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
import SourcesList from './SourcesList';
import ActionTabbedContent from './TabbedContent';
import { TAction } from '../types/Actions';
import { TMyth } from '../types/Myths';
import { Typography } from '@material-ui/core';
import { useAssociatedMyths } from '../hooks/useAssociatedMyths';
import MythCard from './MythCard';

export interface ActionOverlayProps {
  action: TAction;
}

interface DetailsProps {
  longDescription: string;
  associatedMyths: any;
}

// Stuff to pass into the details Tab
const Details = ({ longDescription, associatedMyths }: DetailsProps) => (
  <>
    <Box p={3}>
      <Typography variant="body1">{longDescription}</Typography>
    </Box>
    {associatedMyths?.map((item: { data: { myth: TMyth } }, i: number) => (
      <MythCard myth={item.data.myth} key={i} />
    ))}
  </>
);

const ActionOverlay: React.FC<ActionOverlayProps> = ({ action }) => {
  const {
    solutionTitle,
    imageUrl,
    solutionType,
    solutionSources,
    solutionSpecificMythIRIs,
    iri,
  } = action;

  useEffect(() => {
    console.log('in ActionOverlay...', solutionSpecificMythIRIs);
  }, []);

  const iris = solutionSpecificMythIRIs || [];

  const associatedMyths = useAssociatedMyths(iris);

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
        details={<Details 
          longDescription={action.longDescription} 
          associatedMyths={associatedMyths}
          />}
        sources={<SourcesList sources={solutionSources} />} // Sources to come later
      />
    </CardOverlay>
  );
};

export default ActionOverlay;
