import React from 'react';
import { TActionNodeList } from '../types/Actions';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import { COLORS } from '../common/styles/CMTheme';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface ActionNodeListProps {
  nodes: TActionNodeList;
}

const styles = makeStyles(() =>
  createStyles({
    actionCard: {
      marginBottom: '2em',
    },
  })
);

const ActionNodeList: React.FC<ActionNodeListProps> = ({ nodes }) => {
  const classes = styles();
  return (
    <div data-testid="ActionNodeList">
      {nodes.map((action, i) => {
        console.log('in actions lise', action);
        return (
          <div className={classes.actionCard}>
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
              bgColor={COLORS.ACCENT2}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ActionNodeList;
