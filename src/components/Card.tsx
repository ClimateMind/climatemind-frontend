import React from 'react';
import { Card, CardMedia, Grid, CardContent, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  preview?: React.ReactNode;
  children?: React.ReactNode;
  index?: number;
  imageUrl?: string;
  actionHeadline?: string;
  cardIcon?: 'prevention' | 'protection' | false;
  bgColor?: string;
  preTitle?: string;
}

const CMCard: React.FC<CardProps> = ({
  header,
  imageUrl,
  preview,
  footer,
  bgColor,
  children,
}: CardProps) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        margin: '0 0 1em',
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
    })
  );

  const classes = useStyles();

  return (
    <Grid item sm={12} lg={12} className={classes.root} data-testid="CMCard">
      <Card className={classes.card}>
        {header}
        {imageUrl && (
          <CardMedia
            className={classes.media}
            image={imageUrl}
            data-testid="CMCard-Image"
          />
        )}

        <CardContent>{children}</CardContent>
        <Box px={1} pb={2} mx={0}>
          {footer}
        </Box>
        {preview}
      </Card>
    </Grid>
  );
};

export default CMCard;
