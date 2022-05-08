import React from 'react';
import { Grid, CardContent } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from './Card/Card';
import MythOverlay from './MythOverlay';
import { COLORS } from '../common/styles/CMTheme';
import { TMyth } from '../types/Myths';
import MythHeader from './MythHeader';
import MythIcon from '@material-ui/icons/Feedback';

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
        color: COLORS.ERROR,
      },
      fact: {
        color: COLORS.SUCCESS,
      },
      title: {
        textTransform: 'capitalize',
        margin: 0,
      },
      mythIcon: {
        display: 'block',
        marginLeft: 'auto',
        padding: '5px',
      },
    })
  );

  const classes = useStyles();
  return (
    <Grid
      item
      sm={12}
      lg={12}
      className={classes.root}
      data-testid={`MythCard-${myth.iri}`}
    >
      <Card bgColor={bgColor}>
        <MythIcon className={classes.mythIcon} />
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
