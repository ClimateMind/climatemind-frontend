import { Grid } from '@mui/material';
import { TConversationState } from '../../types/Conversation';
import { CmTypography } from 'shared/components';

export interface NotifyIconProps {
  state: TConversationState;
}

export const NotifyIcon: React.FC<NotifyIconProps> = ({ state }) => {
  // eslint-disable-next-line
  if (state == TConversationState.UserBInvited) return null;
  // eslint-disable-next-line
  if (state == TConversationState.RatingDone) return null;

  return (
    <div style={{
      margin: '0 0 1.5em',
      backgroundColor: '#B00020',
      height: '16px',
      width: '16px',
      borderRadius: '50%',
      fontSize: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }} data-testid={`NotifyIcon-${state}`}>
      <Grid>
        <CmTypography variant='label' style={{ color: 'white', position: 'relative', left: 1 }}>1</CmTypography>
      </Grid>
    </div>
  );
};
