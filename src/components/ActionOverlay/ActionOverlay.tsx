import { Box } from '@material-ui/core';
import React from 'react';
import { TAction } from '../../types/Actions';
import CardHeader from '../CardHeader';
import CardOverlay from '../CardOverlay';
import Paragraphs from '../Paragraphs';
import SourcesList from '../SourcesList';
import ActionTabbedContent from '../TabbedContent';
import { TMyth } from '../../types/Myths';
import { useAssociatedMyths } from '../../hooks/useAssociatedMyths';
import MythCard from '../MythCard';

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
      <Paragraphs text={longDescription} />
    </Box>
    {associatedMyths?.map((item: { data: { myth: TMyth } }, i: number) => (
      <MythCard myth={item.data.myth} key={i} />
    ))}
  </>
);

export const ActionOverlay: React.FC<ActionOverlayProps> = ({ action }) => {
  const {
    solutionTitle,
    imageUrl,
    solutionType,
    solutionSources,
    solutionSpecificMythIRIs,
    iri,
  } = action;

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
        details={
          <Details
            longDescription={action.longDescription}
            associatedMyths={associatedMyths}
          />
        }
        sources={<SourcesList sources={solutionSources} />} // Sources to come later
      />
    </CardOverlay>
  );
};
