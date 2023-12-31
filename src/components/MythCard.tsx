import { Grid, CardContent } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';

import Card from './Card/Card';
import MythOverlay from './MythOverlay';
import { TMyth } from '../types/Myths';
import MythHeader from './MythHeader';

export interface MythCardProps {
  children?: React.ReactNode;
  myth: TMyth;
}

const MythCard: React.FC<MythCardProps> = ({ myth }: MythCardProps) => {
  return (
    <Grid
      item
      sm={12}
      lg={12}
      style={{
        margin: '0',
        padding: 0,
        width: '100%',
      }}
      data-testid={`MythCard-${myth.iri}`}
    >
      <Card bgColor="white">
        <FeedbackIcon style={{
        display: 'block',
        marginLeft: 'auto',
        padding: '5px',
      }} />
        <CardContent>
          <MythHeader
            mythTitle={myth?.mythTitle}
            mythRebuttal={myth?.mythRebuttal}
          />
        </CardContent>
        {myth.faultyLogicDescription && <MythOverlay myth={myth} />}
      </Card>
    </Grid>
  );
};

export default MythCard;
