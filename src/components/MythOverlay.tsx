import React from 'react';
import { Typography } from '@material-ui/core';
import CardOverlay from './CardOverlay';
import { TMyth } from '../types/Myths';
import { Box } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import MythHeader from './MythHeader';
import TabbedContent from './TabbedContent';
import SourcesList from './SourcesList';

export interface MythOverlayProps {
  myth: TMyth;
}

// Stuff to pass into the details Tab
const Details = () => (
  <>
    <Box p={3}>
      <Typography variant="body1">Description to go here</Typography>
    </Box>
  </>
);

const MythOverlay: React.FC<MythOverlayProps> = ({ myth }) => {
  return (
    <CardOverlay bgColor={COLORS.SUCCESS_LIGHT} openButtonText="WHY?">
      <Box px={2}>
        <MythHeader
          mythTitle={myth.mythTitle}
          mythRebuttal={myth.mythRebuttal}
        />
      </Box>
      <TabbedContent
        tabOneName="Flawed Logic"
        details={<Details />}
        sources={<SourcesList sources={myth.mythSources} />}
      />
    </CardOverlay>
  );
};

export default MythOverlay;
