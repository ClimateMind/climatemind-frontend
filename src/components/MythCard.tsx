import React from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  CardContent,
} from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  preview?: React.ReactNode;
  children?: React.ReactNode;
  shortDescription?: string;
  index?: number;
  imageUrl?: string;
  actionHeadline?: string;
  cardIcon?: 'prevention' | 'protection' | false;
  bgColor?: string;
  preTitle?: string;
}

const CMCard: React.FC<CardProps> = ({
  header,
  shortDescription,
  imageUrl,
  preview,
  footer,
  bgColor = COLORS.SUCCESS_LIGHT,
  children,
}: CardProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        margin: '1em 0',
        width: '100%',
      },
      card: {
        backgroundColor: bgColor,
        height: '100%',
        width: '100%',
      },
      media: {
        margin: 0,
        paddingTop: '56.25%',
      },
      more: {
        textTransform: 'capitalize',
        marginBottom: '-0.5em',
        fontSize: '11pt',
        letterSpacing: '1pt',
      },
      preTitle: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        marginBottom: '-0.4em',
      },
      title: {
        textTransform: 'capitalize',
        margin: 0,
      },
    })
  );

  const classes = useStyles();

  return (
    <Grid item sm={12} lg={12} className={classes.root} data-testid="CMCard">
      Hello
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.preTitle}
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
            “Climate has changed before”
          </Typography>

          <Typography
            className={classes.preTitle}
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
            “Climate has changed before”
          </Typography>
        </CardContent>

        {footer}
        {preview}
      </Card>
    </Grid>
  );
};

export default CMCard;
