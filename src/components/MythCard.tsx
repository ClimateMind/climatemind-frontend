import React from 'react';
import { Box, Typography, Grid, CardContent } from '@material-ui/core';
import Card from '../components/Card';
import { COLORS } from '../common/styles/CMTheme';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TMyth } from '../types/Myths';

export interface MythCardProps {
  children?: React.ReactNode;
  myth: TMyth;
  bgColor?: string;
}

const MythCard: React.FC<MythCardProps> = ({
  bgColor = COLORS.SUCCESS_LIGHT,
  myth,
}: MythCardProps) => {
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
        textTransform: 'capitalize',
        margin: 0,
      },
    })
  );

  const classes = useStyles();
  return (
    <Grid item sm={12} lg={12} className={classes.root} data-testid="MythCard">
      <Card bgColor={bgColor}>
        <CardContent>
          <Box mb={2}>
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
              “{myth?.myth}”
            </Typography>
          </Box>

          <Box>
            <Typography
              className={`${classes.smallText} ${classes.fact}`}
              gutterBottom
              variant="h3"
              component="h3"
            >
              WHAT SCIENCE SAY'S
            </Typography>

            <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              component="h2"
            >
              “{myth?.fact}”
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MythCard;
