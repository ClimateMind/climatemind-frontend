import { Box, Card, CardContent } from '@mui/material';
import { COLORS } from '../../common/styles/CMTheme';

export type SummaryCardProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  children,
}) => {
  return (
    <Card
      style={{
        width: '100%',
        border: `1px solid ${COLORS.CARD_BORDER}`,
      }}
      data-testid={`summary-card-${title}`}
    >
      <CardContent>
        <Box mt={-1} mb={-2}>
          {title}
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
