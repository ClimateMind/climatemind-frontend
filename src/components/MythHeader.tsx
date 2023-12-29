import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';
import { capitalize } from '../helpers/capitalize';
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter';
import CmTypography from 'shared/components/CmTypography';

export interface MythHeaderProps {
  mythTitle: string;
  mythRebuttal: string;
}

const MythHeader: React.FC<MythHeaderProps> = ({
  mythTitle,
  mythRebuttal,
}: MythHeaderProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        margin: '0',
        padding: 0,
        width: '100%',
        fontFamily: 'Bilo',
      },
      smallText: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        marginBottom: '-0.1em',
      },
      myth: {
        color: COLORS.ERROR,
      },
      fact: {
        color: COLORS.SUCCESS,
      },
      title: {
        margin: 0,
      },
      factTitle: {
        margin: 0,
        padding: '5px 0',
        fontSize: 'clamp(16px, 2vw, 1.2rem)' || 16,
        letterSpacing: '1px',
        color: COLORS.SUCCESS,
      },
      mythTitle: {
        margin: 0,
        padding: '5px 0',
        fontSize: 'clamp(16px, 2vw, 1.2rem)' || 16,
        color: COLORS.ERROR,
      },
    })
  );

  const classes = useStyles();
  return (
    <>
      <Box mb={4}>
        <CmTypography
          variant="label"
          className={`${classes.smallText} ${classes.myth}`}
          style={{ textAlign: 'left' }}
        >
          Myth
        </CmTypography>

        <CmTypography
          variant="h3"
          className={classes.mythTitle}
          style={{ textAlign: 'left' }}
        >
          <em>{capitalize(mythTitle)}</em>
        </CmTypography>
      </Box>

      <Box>
        <CmTypography
          variant="label"
          className={`${classes.smallText} ${classes.fact}`}
          style={{ textAlign: 'left' }}
        >
          Truth
        </CmTypography>

        <CmTypography
          variant="h3"
          className={classes.factTitle}
          style={{ textAlign: 'left' }}
        >
          {capitalizeFirstLetter(mythRebuttal)}
        </CmTypography>
      </Box>
    </>
  );
};

export default MythHeader;
