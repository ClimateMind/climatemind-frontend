import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';

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
      },
      smallText: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        marginBottom: '-0.1em',
      },
      myth: {
        color: COLORS.WARNING,
      },
      fact: {
        color: COLORS.SUCCESS,
      },
      title: {
        margin: 0,
      },
    })
  );

  const classes = useStyles();
  return (
    <>
      <Box mb={4}>
        <Typography
          className={`${classes.smallText} ${classes.fact}`}
          gutterBottom
          variant="h3"
          component="h3"
        >
          Truth
        </Typography>

        <Typography
          className={classes.title}
          gutterBottom
          variant="h6"
          component="h2"
        >
          {capitalizeFirstLetter(mythRebuttal)}
        </Typography>
      </Box>

      <Box>
        <Typography
          className={`${classes.smallText} ${classes.myth}`}
          gutterBottom
          variant="h3"
          component="h3"
        >
          Myth
        </Typography>

        <Typography
          className={classes.title}
          gutterBottom
          variant="h6"
          component="h2"
        >
          {capitalizeFirstLetter(mythTitle)}
        </Typography>
      </Box>
    </>
  );
};

export default MythHeader;
