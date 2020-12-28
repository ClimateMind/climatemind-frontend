import React from 'react';
import CardOverlay from './CardOverlay';
import ActionTabbedContent from './ActionTabbedContent';
import { TAction } from '../types/Actions';

export interface ActionOverlayProps {
  action: TAction;
}

const ActionOverlay: React.FC<ActionOverlayProps> = ({ action }) => {
  const { solutionTitle, description, imageUrl } = action;
  return (
    <CardOverlay
      shortDescription="This is the short desc"
      imageUrl={imageUrl}
      title={solutionTitle}
      description={description}
      isAction={true}
    >
      <ActionTabbedContent action={action} />
    </CardOverlay>
  );
};

export default ActionOverlay;
