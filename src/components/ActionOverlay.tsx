import React from 'react';
import CardOverlay from './CardOverlay';
import CardHeader from './CardHeader';
import ActionTabbedContent from './ActionTabbedContent';
import { TAction } from '../types/Actions';

export interface ActionOverlayProps {
  action: TAction;
}

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
      <ActionTabbedContent action={action} />
    </CardOverlay>
  );
};

export default ActionOverlay;
