import { TActionNodeList } from '../../types/Actions';
import Card from '../Card/Card';
import { ActionOverlay } from '../ActionOverlay';
import CardHeader from '../CardHeader';
import { COLORS } from '../../common/styles/CMTheme';
import { CmTypography } from 'shared/components';

export interface ActionNodeListProps {
  nodes: TActionNodeList;
}

export const ActionNodeList: React.FC<ActionNodeListProps> = ({ nodes }) => {
  return (
    <div data-testid="ActionNodeList">
      {nodes.map((action, i) => {
        return (
          <div style={{
            marginBottom: '2em',
          }}>
            <Card
              header={
                <CardHeader
                  index={i}
                  title={action.solutionTitle}
                  cardIcon={action.solutionType}
                  preTitle={`${action.solutionType} action`}
                />
              }
              imageUrl={action.imageUrl}
              bgColor={COLORS.ACCENT2}
              footer={<ActionOverlay action={action} />}
            >
              <CmTypography variant="body">{action.shortDescription}</CmTypography>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
