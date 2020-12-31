import React from 'react';
import CardOverlay from './CardOverlay';
import { TMyth } from '../types/Myths';
import { Box } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import MythHeader from './MythHeader';

export interface MythOverlayProps {
  myth: TMyth;
}

interface DetailsProps {
  shortDescription: string;
  longDescription: string;
}

// Stuff to pass into the details Tab
// const Details = ({ shortDescription, longDescription }: DetailsProps) => (
//   <>
//     <Box p={3}>
//       <Typography variant="body1">{shortDescription}</Typography>
//       <Typography variant="body1">{longDescription}</Typography>
//     </Box>
//   </>
// );

const MythOverlay: React.FC<MythOverlayProps> = ({ myth }) => {
  return (
    <CardOverlay bgColor={COLORS.SUCCESS_LIGHT} openButtonText="WHY">
      <Box px={2}>
        <MythHeader
          mythTitle={myth.mythTitle}
          mythRebuttal={myth.mythRebuttal}
        />
      </Box>
    </CardOverlay>
  );
};

export default MythOverlay;
