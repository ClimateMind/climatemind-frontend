import React from 'react';
import { TActionNodeList } from '../types/Actions';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import { COLORS } from '../common/styles/CMTheme';

export interface ActionNodeListProps {
  nodes: TActionNodeList;
}

const ActionNodeList: React.FC<ActionNodeListProps> = ({ nodes }) => {
  return (
    <div data-testid="ActionNodeList">
      {nodes.map((action, i) => {
        console.log('in actions lise', action);
        return (
          <>
            <Card
              header={
                <CardHeader
                  index={i}
                  title={action.title}
                  cardIcon={action.actionType}
                  preTitle={`${action.actionType} action`}
                />
              }
              shortDescription={action.shortDescription}
              imageUrl={action.imageUrl}
              bgColor={COLORS.YELLOW}
            />
          </>
        );
      })}
    </div>
  );
};

export default ActionNodeList;
