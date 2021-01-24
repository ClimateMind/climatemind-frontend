import { Box, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';
import { TMyth } from '../types/Myths';
import CardOverlay from './CardOverlay';
import MythHeader from './MythHeader';
import Paragraphs from './Paragraphs';
import SourcesList from './SourcesList';
import TabbedContent from './TabbedContent';

export interface MythOverlayProps {
  myth: TMyth;
}

interface DetailsProps {
  myth: TMyth;
}

// Stuff to pass into the details Tab
const Details: React.FC<DetailsProps> = ({ myth }) => (
  <>
    <Box p={3}>
      <Paragraphs text={myth.faultyLogicDescription} />
    </Box>
  </>
);

const MythOverlay: React.FC<MythOverlayProps> = ({ myth }) => {
  const useStyles = makeStyles(() =>
    // Styles to force the positioning of the more button
    createStyles({
      root: {
        marginBottom: -16,
        marginTop: 16,
      },
    })
  );

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CardOverlay
          bgColor={COLORS.SUCCESS_LIGHT}
          iri={myth.iri}
          openButtonText="WHY?"
        >
          <Box px={2} py={2}>
            <MythHeader
              mythTitle={myth.mythTitle}
              mythRebuttal={myth.mythRebuttal}
            />
          </Box>
          <TabbedContent
            tabOneName="Flawed Logic"
            details={<Details myth={myth} />}
            sources={<SourcesList sources={myth.mythSources} />}
          />
        </CardOverlay>
      </div>
    </>
  );
};

export default MythOverlay;
